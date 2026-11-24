# 13-07 - Matriz de evidencias HTTP

| Nível | Ferramenta | Executado | Resultado |
|---|---|---:|---|
| Manual | REST Client | Não | Ferramenta não confirmada nesta sessão |
| Manual | `curl`/Bash | Sim | Contratos 201, 400, 422 e 404 |
| Automatizado | `run-checks.sh` | Sim | 20 ok, 0 falhas; codigo 0 |
| Automatizado | `run-checks.sh --durability` | Sim | 23 ok, 0 falhas; codigo 0; linha completa identica antes/depois |
| Automatizado | `BASE_URL=http://localhost:9` | Sim | 4 ok, 15 falhas; codigo 1; conexao recusada detectada |
| Testes | `pnpm test` | Sim | 6 arquivos, 21 testes |
| Testes | `pnpm test:integration` | Sim | 1 arquivo, 1 teste |
| Testes | `pnpm test:e2e` | Sim | 2 arquivos, 2 testes; isolamento confirmado pelo `NODE_ENV=test` e repositório em memória |

Build, lint e as suites de teste sao resultados da verificacao anterior, nao foram reexecutados nesta correcao. O E2E tambem nao foi reexecutado. O REST Client da extensao nao foi executado manualmente.

O script usa Bash com chamadas a Windows PowerShell para interagir com Docker Desktop. A prova de durabilidade seleciona somente o `eventId` criado pela execucao e compara o JSON da linha inteira. O PostgreSQL permaneceu ativo e saudavel; somente a API foi reiniciada.
