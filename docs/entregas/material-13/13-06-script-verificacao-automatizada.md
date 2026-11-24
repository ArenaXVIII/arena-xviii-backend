# 13-06 - Script de verificacao automatizada

## Execucoes apos as correcoes

- `bash -n`: aprovado; o arquivo permanece LF-only.
- Execucao normal final: `20 ok, 0 falha(s)`, codigo `0`.
- Execucao final `--durability`: `23 ok, 0 falha(s)`, codigo `0`.
- `BASE_URL=http://localhost:9`, definido dentro do Bash: `4 ok, 15 falha(s)`, codigo `1`. A recusa de conexao foi detectada e o corpo vazio nao foi aceito como JSON valido.
- A consulta de migrations retornou codigo `0` e zero migrations pendentes nas execucoes. O script verifica o codigo de saida antes de contar pendencias; falha da consulta nao foi injetada separadamente.
- A durabilidade reiniciou exclusivamente `api`. Ocorreram recusas transitorias durante a espera pelo retorno da API; o endpoint voltou a responder `200`, e a linha completa consultada antes/depois permaneceu identica.
- A verificacao final de servicos mostrou `api` em execucao e `postgres` ativo e saudavel.

## Garantias implementadas e verificadas

- O SQL le `POSTGRES_USER` e `POSTGRES_DB` do proprio container `postgres`, sem usuario, banco ou senha fixos no script.
- A consulta e limitada ao `eventId` validado recebido no POST. `to_jsonb(e)::text` serializa a linha completa; a comparacao de igualdade cobre todos os campos antes/depois do restart.
- A resposta HTTP valida status `201`, JSON valido, UUID, conjunto exato de propriedades `createdAt,eventId,message,status`, ausencia de `campoExtra`, status `planning`, timestamp ISO-8601 e mensagem contratual.
- A resposta sem corpo, como no teste de `BASE_URL` invalida, e considerada JSON invalido e contabilizada como falha.
- O status de saida da consulta de migrations e contabilizado sem `|| true`; uma falha impede a contagem de pendencias e aumenta o total de falhas.

## Observacoes das tentativas de compatibilidade

Durante a correcao foram necessarias iteracoes para remover a dependencia de Node no Bash do WSL, evitar problemas de aspas ao encaminhar SQL pelo Windows PowerShell e preservar o texto recebido da resposta. Tambem houve uma tentativa de definir `BASE_URL` somente no PowerShell do Windows; a variavel nao foi propagada ao WSL e aquela execucao usou a URL padrao.

Nesta rodada, dez respostas HTTP `201` ocorreram em execucoes do script que alcancaram o endpoint local; cada execucao criou no maximo um registro. As duas ultimas execucoes com sucesso foram a normal e a de durabilidade. Nenhum registro foi removido. As verificacoes finais com URL invalida foram iniciadas dentro do Bash e nao obtiveram resposta do endpoint.

## Limitacoes e pendencias

- Shellcheck nao foi executado porque nao esta disponivel no ambiente.
- A extensao REST Client nao foi executada manualmente.
- Build, suites de teste e E2E nao foram reexecutados nesta correcao; resultados registrados anteriormente permanecem historicos.
- A falha da consulta de migrations nao foi simulada; a contabilizacao do caminho de erro foi verificada por inspecao do fluxo do script.
