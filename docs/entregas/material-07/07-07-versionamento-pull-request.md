# 07-07 - Versionamento e Pull Request

## Estado da governanca

Esta copia de trabalho nao possui `.git`. Os comandos de inspeccao retornaram `fatal: not a git repository`. Assim, nao foi possivel criar branch, commit, push ou Pull Request, nem obter hashes reais.

## Plano para o clone Git

- Branch de origem: `feature/uc03-events-http`.
- Branch-base: branch do servico GREEN, enquanto #15 nao estiver integrada em `main`.
- Mensagem sugerida: `feat(events): expose publish event HTTP endpoint (#17)`.
- PR: abrir como Draft ou Open conforme a revisao por pares; nao fazer merge automatico.
- Project: mover #17 para `In Progress` durante implementacao e `In Review` somente apos publicar o PR.

## Conteudo esperado do PR

Referenciar #12, #17 e as dependencias #15/#16; separar commits herdados dos exclusivos da fronteira; anexar as evidencias de `curl`, `pnpm test`, `pnpm test:e2e`, build e lint; registrar a limitacao do repositorio em memoria.

Nenhum commit, push ou PR foi inventado nesta entrega.
