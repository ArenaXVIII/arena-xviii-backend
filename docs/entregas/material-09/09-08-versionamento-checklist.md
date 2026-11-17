# 09-08 - Versionamento e checklist consolidado

## Identificacao e resumo

- Projeto: Arena XVIII.
- Caso de uso: UC03 - Divulgar Evento.
- Issue de persistencia: #16, aberta e atribuida a `LunaRibeiro` na consulta publica de 2026-11-17.
- Branch local: `feature/uc03-material-09-postgres-typeorm`, criada a partir de `main` no merge commit `90dad12135d0a2512ab9105df6344dbc61226bc9`.
- Contrato preservado: `IEventsRepository` / `EVENTS_REPOSITORY`.
- Alteracoes de codigo: entidade ORM, migration, Mapper, adaptador TypeORM, DataSource, configuracao Nest, configuracao de teste, perfil PostgreSQL de teste e testes do adapter.
- Commit/push inicial: `be34295` foi enviado para a branch de trabalho. Esta atualizacao registra a migration aplicada e o teste PostgreSQL real; ainda nao ha novo commit/PR para este complemento.

A Issue #16 permanece aberta. Seu corpo publico ainda solicita confirmacao H03 para o repository inicial em memoria; nao ha comentarios. O planejamento local registra DoR-07 pendente. O Project nao foi consultado porque o GitHub CLI nao esta autenticado; status atual e contagem WIP nao foram verificados. Nenhuma Issue ou status de Project foi alterado. O trabalho permanece como implementacao local, sem promover a Sub-Issue para `In Progress`, `In Review` ou `Done`.

A lista publica de PRs consultada inclui o PR #104, que integrou o Material 08 em `main`; nao foi encontrado PR da tarefa Material 09. O GitHub CLI nao esta autenticado, portanto nao foram criados nem atualizados PRs.

## Checklist

Os status abaixo usam exclusivamente `Confirmado`, `Pendente`, `Nao foi possivel verificar` ou `Nao aplicavel`.

| Item                                                          | Status                     | Evidencia ou pendencia                                                                                 |
| ------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| Oito arquivos do Material 08 recuperados e analisados         | Confirmado                 | Versionados no merge #104 e lidos do commit atual.                                                     |
| Diretorio de destino informado                                | Confirmado                 | `docs/entregas/material-09/`.                                                                          |
| Contratos existentes preservados                              | Confirmado                 | Entidade de dominio, Service, repository, token, DTOs e controllers sem alteracao de assinatura.       |
| Sub-Issue de persistencia identificada                        | Confirmado                 | Issue #16 / SUB-04.                                                                                    |
| Definition of Ready satisfeita                                | Pendente                   | H03 e revisao humana nao confirmados; DoR-07 pendente no planejamento.                                 |
| Dependencias analisadas                                       | Confirmado                 | Planejamento aponta Issues #13 e #14.                                                                  |
| Status atual do board e WIP da equipe                         | Nao foi possivel verificar | GitHub Project requer autenticacao; nao foi alterado.                                                  |
| Linha de base executada                                       | Confirmado                 | Apos instalacao congelada: 3 arquivos, 11 testes aprovados na `main`.                                  |
| Branch-base definida com seguranca                            | Confirmado                 | `main` continha o merge do Material 08; branch local criada sem trocar arquivos locais preexistentes.  |
| Docker/Compose inspecionados sem remover volumes              | Confirmado                 | Compose existente preservado; nenhuma operacao destrutiva executada.                                   |
| Banco de desenvolvimento identificado e conectado             | Pendente                   | Configurado, mas nao conectado.                                                                        |
| Banco de testes isolado configurado                           | Confirmado                 | Servico de profile `test`, porta publicada 5434 e volume distinto; container healthy.                  |
| Porta host vs. porta interna compreendida                     | Confirmado                 | Mapeamento 5434:5432; o teste nao exige igualdade com `inet_server_port()`.                            |
| Credenciais reais protegidas                                  | Confirmado                 | `.env` nao foi criado nem versionado; documentacao nao reproduz senhas.                                |
| Conexao PostgreSQL comprovada                                 | Confirmado                 | Banco/usuario de teste verificados por SQL; porta interna 5432 e host 5434.                            |
| AppModule/DataSource configurados com `synchronize: false`    | Confirmado                 | Configuracao runtime, CLI e teste.                                                                     |
| Entidade ORM separada implementada                            | Confirmado                 | `EventOrmEntity`.                                                                                      |
| Mapper bidirecional implementado                              | Confirmado                 | `EventMapper.toPersistence` / `toDomain`; 3 testes direcionados passaram.                              |
| Migration concorda com entidade ORM                           | Confirmado                 | Tabela, tipos, colunas e nulabilidade alinhados no codigo.                                             |
| Migration aplicada no banco correto                           | Confirmado                 | `CreateEventsTable1794873600000` aplicada no banco exclusivo de teste, apos verificacao de identidade. |
| Schema e historico de migrations verificados por SQL          | Confirmado                 | `information_schema`, tabela `events` e historico `migrations` consultados.                            |
| Adaptador TypeORM tipado implementado                         | Confirmado                 | Implementa `IEventsRepository` sem alterar o contrato.                                                 |
| Imports ESM e compilacao verificados                          | Confirmado                 | `pnpm build` e `pnpm exec tsc --noEmit` passaram.                                                      |
| Provider TypeORM registrado no modulo                         | Confirmado                 | `TypeOrmModule.forFeature` e token registrados fora do runtime de teste.                               |
| Provider resolvido e aplicacao iniciada com PostgreSQL        | Pendente                   | Depende de banco ativo.                                                                                |
| Testes em memoria anteriores permanecem independentes         | Confirmado                 | Regressao completa passou sem PostgreSQL.                                                              |
| Cadastro HTTP real e consulta SQL direta                      | Pendente                   | Nao executados; nao ha resposta ou UUID real.                                                          |
| Durabilidade apos reinicio do backend                         | Pendente                   | Sem consultas SQL antes/depois; nenhuma conclusao de durabilidade declarada.                           |
| Teste PostgreSQL implementado com identidade e cleanup seguro | Confirmado                 | Fonte completa; sem truncate/drop; conexao fechada nos hooks.                                          |
| Teste PostgreSQL executado e aprovado                         | Confirmado                 | `pnpm test:integration`: 1 arquivo, 1 teste aprovado no banco isolado.                                 |
| Suite anterior reexecutada sem regressao                      | Confirmado                 | 4 arquivos, 14 testes aprovados apos a tentativa de integracao.                                        |
| Alteracoes e arquivos de ambiente revisados                   | Confirmado                 | `git status` final consultado; nenhum `.env` local ou arquivo de segredo foi versionado.               |
| Commit semantico e hash registrado                            | Pendente                   | Nenhum commit foi feito.                                                                               |
| Branch publicada                                              | Pendente                   | Branch somente local.                                                                                  |
| PR criado/atualizado                                          | Pendente                   | Sem autenticacao GitHub para escrita; nenhum PR criado.                                                |
| GitHub Project atualizado                                     | Nao foi possivel verificar | CLI sem autenticacao; nenhum status alterado.                                                          |
| Nenhum merge prematuro realizado                              | Confirmado                 | Nenhum merge executado.                                                                                |
| Oito artefatos Material 09 gravados                           | Confirmado                 | Arquivos 09-01 a 09-08 neste diretorio.                                                                |

## Pendencias e proximas acoes

1. Formalizar H03 e concluir revisao humana da Issue #16; confirmar DoR-07 antes de qualquer transicao no board.
2. Consultar o Project e a politica WIP com uma sessao GitHub autenticada; nao mover Issues para liberar WIP artificialmente.
3. Iniciar Docker Desktop, configurar `.env` local sem versiona-lo, validar `docker compose config` e iniciar somente `postgres-test` pelo profile `test`.
4. Iniciar/verificar o PostgreSQL de desenvolvimento, confirmar sua identidade e schema antes de aplicar a migration nesse ambiente.
5. Executar cadastro HTTP real no banco de desenvolvimento, consulta SQL e roteiro de durabilidade apos reiniciar apenas o backend.
6. Executar `pnpm migration:show`, revisar diff/segredos e, apos prontidao e revisao humana, criar novo commit/push para estas evidencias e abrir PR contra a base confirmada pela equipe.
