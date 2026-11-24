# Verificacao HTTP containerizada - UC03

## Finalidade

Esta colecao verifica a API ARENA XVIII em execucao na porta publicada `3000`. Os arquivos `.http` permitem inspecao manual com a extensao REST Client e nao fazem assercoes.

## Pre-requisitos

- Docker Engine e Docker Compose disponiveis.
- Bash com `curl`, `iconv`, `base64` e `tr`.
- No Windows/WSL, `powershell.exe` disponivel para os comandos Docker Compose.
- Serviço `api` e banco `postgres` ativos.
- Migration `CreateEventsTable1794873600000` aplicada.

```bash
docker compose up -d --build api
docker compose ps
```

## Conteudo

| Arquivo | Uso |
|---|---|
| `00-smoke.http` | Sanidade da API e rota inexistente |
| `01-events-divulgar-evento.http` | Contrato de cadastro usado pelo fluxo UC03 |
| `02-apoio.http` | Verificacao de divulgacao sem dados previamente preparados |
| `run-checks.sh` | Assercoes automatizadas e durabilidade |

## Verificacao automatizada

No Git Bash ou Bash disponivel no Windows:

```bash
bash http-rest-client/containerizado/run-checks.sh
bash http-rest-client/containerizado/run-checks.sh --durability
BASE_URL=http://localhost:9 bash http-rest-client/containerizado/run-checks.sh
```

O script usa `BASE_URL` para alterar o endereco apenas em verificacoes controladas.
Ao iniciar o Bash via PowerShell/WSL, defina `BASE_URL` dentro do comando Bash; variaveis definidas somente no PowerShell do Windows podem nao ser propagadas ao WSL.

```bash
# executar no Bash, a partir da raiz do repositorio
BASE_URL=http://localhost:9 bash http-rest-client/containerizado/run-checks.sh
```

O helper de persistencia le `POSTGRES_USER` e `POSTGRES_DB` do container `postgres`, consulta apenas o `eventId` criado pela propria execucao e compara o JSON completo da linha antes/depois do restart. O corpo HTTP de cadastro valida os campos `eventId`, `status`, `createdAt` e `message`, e rejeita propriedades extras.

## Dados gravados

Cada execucao normal grava no máximo um evento via `POST /events`. A execução com `--durability` pode gravar até um evento adicional. Os registros não são removidos.

O script não usa `down`, `down -v`, remocao de volumes ou prune. Não reinicia PostgreSQL, não executa migrations e não acessa o banco de testes.

## Consulta SQL manual

Use o `eventId` devolvido pelo cadastro válido:

```bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Exemplo:

```sql
SELECT "eventId", "name", "status", "createdAt", "updatedAt"
FROM "events"
WHERE "eventId" = 'UUID-RETORNADO';
```

Repita somente o resultado antes e depois de `docker compose restart api`. O mesmo registro e os mesmos atributos devem permanecer.

## Limitacoes

Cenários de divulgação bem-sucedida dependem de um evento previamente planejado com todos os campos exigidos pela RN01. Como o cadastro cria evento em `planning`, estes cenários não são inventados no script. Testes E2E não são executados sem banco isolado confirmado.
