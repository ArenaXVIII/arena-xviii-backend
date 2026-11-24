# 13-08 - Versionamento e checklist

## Estado de versionamento

- Branch atual: `feature/uc03-material-13-rest-client`.
- PR #106 já integrado à `main`.
- Nenhum commit, push, merge ou fechamento de Issue foi realizado nesta atividade.
- Nenhuma alteração foi feita em código-fonte, migrations, Compose, Dockerfile ou lockfile.
- As alterações do Material 13 estão não rastreadas no Git; nenhum arquivo foi staged.

## Segurança do diff

- Nesta correção foram modificados `http-rest-client/containerizado/run-checks.sh`, seu README operacional e as evidências `13-06`, `13-07` e `13-08`.
- Nenhum `.env`, segredo ou credencial foi usado nos arquivos.
- Nenhum UUID real foi apresentado como dado inventado.
- `.env` está ignorado pelo `.gitignore`.
- Código-fonte, contratos, migrations, testes existentes e Compose não foram modificados.
- O filesystem confirma `test -x` e `ls -l` mostra bits `x`; porém `git ls-files -s` não tem entrada porque o script está untracked, e `core.filemode=false`. O modo Git `100755` ainda depende de versionamento; ao adicionar, usar `git add --chmod=+x http-rest-client/containerizado/run-checks.sh`.

## Checklist final

- [x] Coleção HTTP criada.
- [x] Arquivo de smoke criado.
- [x] Cenários do UC03 criados.
- [x] Cenários de apoio criados.
- [x] README containerizado criado.
- [x] Script criado e sintaxe Bash aprovada.
- [x] Execução normal aprovada (20/20; codigo 0).
- [x] Execução de durabilidade aprovada (23/23; codigo 0; linha completa identica).
- [x] Detecção de falha comprovada com `BASE_URL` inválida (15 falhas; codigo 1).
- [x] Teste rápido aprovado.
- [x] Integração PostgreSQL isolada aprovada.
- [ ] REST Client manual executado pela extensão.
- [ ] Shellcheck instalado.
- [x] Testes E2E executados anteriormente após confirmar isolamento por `NODE_ENV=test` e repositório em memória (2/2); não reexecutados nesta correção.
- [ ] Modo Git `100755` confirmado (arquivo ainda não staged/rastreado).
- [ ] Commit e PR desta atividade.
- [ ] Revisão humana.

Nenhuma operacao Git/GitHub foi realizada nesta correcao. O modo `100755` permanece pendente de versionamento.
