# Artefato 13 — Execução no GitHub e Evidências

## 1. Dados da execução

| Item | Valor |
|---|---|
| Data e hora | 03/11/2026, 15:29 (UTC−03:00) |
| Executado por | `@LunaRibeiro`, via GitHub CLI 2.103.3 |
| Repositório | [`ArenaXVIII/arena-xviii-backend`](https://github.com/ArenaXVIII/arena-xviii-backend) (branch padrão `main`) |
| Planejamento de origem | `docs/planejamento/01-03` (Epic), `01-04` (Sub-Issues), `01-07` (Labels), `01-08` (Project) |

## 2. Issue principal (Epic)

| Item | Valor |
|---|---|
| Número | **#12** |
| Título | `[UC03] Divulgar Evento` |
| URL | https://github.com/ArenaXVIII/arena-xviii-backend/issues/12 |
| Labels | `type:epic`, `module:eventos`, `uc:UC03`, `priority:high` |
| Estado no board | `Ready` |
| Responsável | `@LunaRibeiro` |

O checklist do épico referencia as Sub-Issues reais (#13 a #19). As 7 Sub-Issues estão vinculadas ao #12 pelo recurso nativo de sub-issues do GitHub.

## 3. Sub-Issues

| ID Provisório | Número Real no GitHub | Título da Sub-Issue | URL | Estado no Board | Responsável |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SUB-01` | `#13` | Modelar a entidade Evento e a transição de divulgação | https://github.com/ArenaXVIII/arena-xviii-backend/issues/13 | Ready | @LunaRibeiro |
| `SUB-02` | `#14` | Definir os contratos de aplicação (porta de repositório e DTO de resposta) | https://github.com/ArenaXVIII/arena-xviii-backend/issues/14 | Backlog | @LunaRibeiro |
| `SUB-03` | `#15` | Implementar o serviço de aplicação de divulgação | https://github.com/ArenaXVIII/arena-xviii-backend/issues/15 | Backlog | @LunaRibeiro |
| `SUB-04` | `#16` | Implementar o adaptador de persistência de eventos | https://github.com/ArenaXVIII/arena-xviii-backend/issues/16 | Backlog | @LunaRibeiro |
| `SUB-05` | `#17` | Expor a divulgação via API HTTP e registrar o módulo de eventos | https://github.com/ArenaXVIII/arena-xviii-backend/issues/17 | Backlog | @LunaRibeiro |
| `SUB-06` | `#18` | Implementar os testes de integração ponta a ponta (e2e) do slice | https://github.com/ArenaXVIII/arena-xviii-backend/issues/18 | Backlog | @LunaRibeiro |
| `SUB-07` | `#19` | Documentar tecnicamente o primeiro slice | https://github.com/ArenaXVIII/arena-xviii-backend/issues/19 | Backlog | @LunaRibeiro |

Nas seções "Dependências" das Sub-Issues publicadas, as referências `SUB-XX` foram substituídas pelos números reais (`#13` a `#19`).

## 4. GitHub Project (Board)

| Item | Valor |
|---|---|
| Project | **Arena XVIII** (#3), da organização `ArenaXVIII` |
| URL | https://github.com/orgs/ArenaXVIII/projects/3 |
| Campo Status | `Backlog`, `Ready`, `In Progress`, `In Review`, `Done` |

**Decisão de execução:** foi reutilizado o Project já existente da organização, em vez de criar um novo. Ele já adiciona automaticamente as Issues do repositório, e os seus 5 status já correspondiam à metodologia. Apenas a grafia de `In progress` e `In review` foi ajustada para `In Progress` e `In Review`.

## 5. Labels criadas ou atualizadas

| Label | Cor | Situação |
|---|---|---|
| `module:eventos` | `#1D76DB` | Criada |
| `uc:UC03` | `#5319E7` | Criada |
| `type:epic` | `#3E4B9E` | Atualizada (já existia) |
| `type:feature` | `#0E8A16` | Atualizada (já existia) |
| `type:test` | `#FBCA04` | Atualizada (já existia) |
| `type:documentation` | `#0075CA` | Criada |
| `layer:domain` | `#C2E0C6` | Atualizada (já existia) |
| `layer:application` | `#BFD4F2` | Atualizada (já existia) |
| `layer:infra` | `#D4C5F9` | Criada |
| `layer:api` | `#F9D0C4` | Criada |
| `priority:high` | `#B60205` | Atualizada (já existia) |
| `priority:medium` | `#D93F0B` | Atualizada (já existia) |
| `priority:low` | `#E4E669` | Atualizada (já existia) |

## 6. Ocorrências e pendências

| Ocorrência | Situação |
|---|---|
| Já existia no repositório um planejamento anterior do UC03 (Issues #3 a #11, com 8 Sub-Issues e outra decomposição) | A equipe adotou o planejamento de `docs/planejamento/` (opção B). Por decisão da equipe, as Issues #3 a #11 receberam um comentário apontando para o épico #12, foram fechadas como *Not planned* e removidas do board. O histórico foi preservado e elas podem ser reabertas |
| O título da Issue #3 contém "EPIC-UC12" para um épico do UC03 | Não corrigido (Issue fechada e fora do planejamento adotado) |
| Ao renomear as opções do campo Status, o GitHub limpou o status de todos os itens do board | Corrigido: os itens #12 a #19 foram posicionados conforme o planejamento e as Issues #3 a #11 foram restauradas para `Backlog`, como estavam antes |
| O token do `gh` não tinha o escopo `project` | Resolvido com `gh auth refresh -s project` |
| A cópia local do projeto não é um repositório Git | O repositório foi clonado em outra pasta, e os artefatos foram versionados no commit `3f0cd0a` (`main`) |
