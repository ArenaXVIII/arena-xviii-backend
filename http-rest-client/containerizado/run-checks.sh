#!/usr/bin/env bash
# Verificacao automatizada da API em Docker Compose para o UC03.
# Uso: ./http-rest-client/containerizado/run-checks.sh [--durability]
# --durability reinicia somente api e verifica o ultimo registro criado.
set -u

BASE="${BASE_URL:-http://localhost:3000}"
DURABILITY=0
pass=0
fail=0

if [ "${1:-}" = "--durability" ]; then
  DURABILITY=1
fi

cd "$(dirname "$0")/../.." || exit 1

check() {
  local description="$1"
  local expected="$2"
  local obtained="$3"
  if [ "$expected" = "$obtained" ]; then
    printf 'ok    %s (esperado=%s, obtido=%s)\n' "$description" "$expected" "$obtained"
    pass=$((pass + 1))
  else
    printf 'FALHA %s (esperado=%s, obtido=%s)\n' "$description" "$expected" "$obtained"
    fail=$((fail + 1))
  fi
}

status() {
  curl --silent --show-error --max-time 10 -o /dev/null -w '%{http_code}' "$@"
}

sql() {
  local event_id="$1"
  local ps_script
  local encoded

  if [[ ! "$event_id" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$ ]]; then
    return 2
  fi

  ps_script="$(cat <<POWERSHELL
\$eventId = '$event_id'
if (\$eventId -notmatch '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') {
  Write-Error 'Invalid event id.'
  exit 2
}

\$userOutput = & docker compose exec -T postgres printenv POSTGRES_USER
\$userExit = \$LASTEXITCODE
\$postgresUser = (\$userOutput -join '').Trim()
if (\$userExit -ne 0 -or [string]::IsNullOrWhiteSpace(\$postgresUser)) {
  Write-Error 'Unable to read PostgreSQL user from the container environment.'
  exit 1
}

\$databaseOutput = & docker compose exec -T postgres printenv POSTGRES_DB
\$databaseExit = \$LASTEXITCODE
\$postgresDatabase = (\$databaseOutput -join '').Trim()
if (\$databaseExit -ne 0 -or [string]::IsNullOrWhiteSpace(\$postgresDatabase)) {
  Write-Error 'Unable to read PostgreSQL database from the container environment.'
  exit 1
}

\$query = [string]::Format('SELECT to_jsonb(e)::text FROM events AS e WHERE to_jsonb(e)->>''eventId'' = ''{0}'';', \$eventId)
& docker compose exec -T postgres psql -X -v ON_ERROR_STOP=1 -qAt -U \$postgresUser -d \$postgresDatabase -c \$query
exit \$LASTEXITCODE
POWERSHELL
)"
  encoded="$(printf '%s' "$ps_script" | iconv -f UTF-8 -t UTF-16LE | base64 | tr -d '\r\n')" || return 1
  powershell.exe -NoProfile -EncodedCommand "$encoded"
}

printf 'SERVICOS\n'
api_status="$(powershell.exe -NoProfile -Command 'docker compose ps api' 2>/dev/null | grep -c 'Up' || true)"
db_status="$(powershell.exe -NoProfile -Command 'docker compose ps postgres' 2>/dev/null | grep -c 'healthy' || true)"
check 'API em execução' '1' "$api_status"
check 'PostgreSQL saudável' '1' "$db_status"

printf '\nSMOKE\n'
smoke_status="$(status "$BASE/")"
check 'GET /' '200' "$smoke_status"
missing_status="$(status "$BASE/rota-inexistente-material-13")"
check 'rota inexistente' '404' "$missing_status"

printf '\nMIGRATIONS\n'
migration_output="$(powershell.exe -NoProfile -Command 'docker compose run --rm --no-deps api pnpm migration:show:prod; exit $LASTEXITCODE' 2>&1)"
migration_status=$?
check 'consulta de migrations executada' '0' "$migration_status"
if [ "$migration_status" -eq 0 ]; then
  pending_count="$(printf '%s\n' "$migration_output" | awk 'index($0, "[ ]") { count++ } END { print count + 0 }')"
  check 'nenhuma migration pendente' '0' "$pending_count"
else
  printf 'Consulta de migrations falhou (exit=%s).\n' "$migration_status"
fi

printf '\nCASO DE USO - CADASTRO UTILIZADO NO UC03\n'
empty_status="$(curl --silent --show-error --max-time 10 -o /dev/null -w '%{http_code}' \
  -H 'Content-Type: application/json' -d '{}' "$BASE/events")"
check 'campo ausente 400' '400' "$empty_status"

spaces_status="$(curl --silent --show-error --max-time 10 -o /dev/null -w '%{http_code}' \
  -H 'Content-Type: application/json' -d '{"name":"   "} ' "$BASE/events")"
check 'nome só com espaços 422' '422' "$spaces_status"

non_string_status="$(curl --silent --show-error --max-time 10 -o /dev/null -w '%{http_code}' \
  -H 'Content-Type: application/json' -d '{"name":123}' "$BASE/events")"
check 'nome não string 400' '400' "$non_string_status"

response_file="$(mktemp)" || exit 1
trap 'rm -f "$response_file"' EXIT

created_http="$(curl --silent --show-error --max-time 10 -o "$response_file" -w '%{http_code}' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Material 13 - UC03 - verificacao automatizada","campoExtra":"removido-pelo-whitelist"}' \
  "$BASE/events")"
response_values="$(powershell.exe -NoProfile -Command '
$json = [Console]::In.ReadToEnd()
if ([string]::IsNullOrWhiteSpace($json)) {
  [Console]::Write("INVALID_JSON||||||invalid")
  exit 2
}
try {
  $body = ConvertFrom-Json -InputObject $json -ErrorAction Stop
  $keys = @($body.PSObject.Properties.Name | Sort-Object) -join ","
  $extra = if (@($body.PSObject.Properties.Name) -contains "campoExtra") { "presente" } else { "ausente" }
  $date = [DateTimeOffset]::MinValue
  $dateValid = if ($body.createdAt -is [string] -and [DateTimeOffset]::TryParseExact([string]$body.createdAt, "yyyy-MM-ddTHH:mm:ss.fffZ", [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::AssumeUniversal, [ref]$date)) { "valid" } else { "invalid" }
  $fields = @($keys, [string]$body.eventId, [string]$body.status, [string]$body.createdAt, [string]$body.message, $extra, $dateValid)
  [Console]::Write($fields -join "|")
} catch {
  [Console]::Write("INVALID_JSON||||||invalid")
  exit 2
}
' < "$response_file")"
response_parse_status=$?
IFS='|' read -r response_keys created_id created_status created_at created_message extra_property created_at_valid <<< "$response_values"
check 'cadastro válido 201' '201' "$created_http"
check 'resposta HTTP JSON válida' '0' "$response_parse_status"
if [[ "$created_id" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$ ]]; then
  id_valid='válido'
else
  id_valid='inválido'
fi
check 'identificador UUID recebido' 'válido' "$id_valid"
check 'campos exatos da resposta HTTP' 'createdAt,eventId,message,status' "$response_keys"
check 'campo extra ausente da resposta' 'ausente' "$extra_property"
check 'status da resposta' 'planning' "$created_status"
check 'createdAt em ISO-8601' 'valid' "$created_at_valid"
check 'mensagem da resposta' 'Evento cadastrado com sucesso.' "$created_message"

printf '\nBANCO\n'
if [ "$id_valid" = 'válido' ]; then
  row_before="$(sql "$created_id")"
  sql_before_status=$?
  row_before="${row_before//$'\r'/}"
  if [ "$sql_before_status" -eq 0 ] && [[ ! "$row_before" =~ ^\{.*\}$ ]]; then
    sql_before_status=1
  fi
  check 'consulta da linha criada' '0' "$sql_before_status"
  if [ "$sql_before_status" -eq 0 ] && [ -n "$row_before" ]; then
    check 'registro persistido no PostgreSQL' 'presente' 'presente'
  else
    check 'registro persistido no PostgreSQL' 'presente' 'ausente'
  fi
else
  row_before=''
  sql_before_status=1
  check 'registro persistido no PostgreSQL' 'presente' 'sem-identificador'
fi

printf '\nDIVULGACAO SEM DADOS PREPARADOS\n'
not_found_status="$(status "$BASE/events/00000000-0000-4000-8000-000000000000/publish" -X PATCH)"
check 'evento inexistente 404' '404' "$not_found_status"

if [ "$DURABILITY" -eq 1 ] && [ "$id_valid" = 'válido' ]; then
  printf '\nDURABILIDADE\n'
  powershell.exe -NoProfile -Command "docker compose restart api" >/dev/null
  restart_ok=0
  i=0
  while [ "$i" -lt 30 ]; do
    if [ "$(status "$BASE/")" = '200' ]; then
      restart_ok=1
      break
    fi
    i=$((i + 1))
    sleep 1
  done
  check 'API voltou após restart' '1' "$restart_ok"

  row_after="$(sql "$created_id")"
  sql_after_status=$?
  row_after="${row_after//$'\r'/}"
  if [ "$sql_after_status" -eq 0 ] && [[ ! "$row_after" =~ ^\{.*\}$ ]]; then
    sql_after_status=1
  fi
  check 'consulta da linha após restart' '0' "$sql_after_status"
  if [ "$sql_before_status" -eq 0 ] &&
     [ "$sql_after_status" -eq 0 ] &&
     [ -n "$row_before" ] &&
     [ "$row_before" = "$row_after" ]; then
    check 'registro após restart permanece idêntico' 'identico' 'identico'
  else
    check 'registro após restart permanece idêntico' 'identico' 'diferente-ou-ausente'
  fi
fi

printf '\nResultado: %d ok, %d falha(s)\n' "$pass" "$fail"
[ "$fail" -eq 0 ]
