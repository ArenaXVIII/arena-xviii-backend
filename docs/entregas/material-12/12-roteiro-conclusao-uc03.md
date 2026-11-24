# Roteiro de Conclusao - UC03 - Divulgar Evento

## Objetivo

Este documento orienta o fechamento formal do UC03 - Divulgar Evento no repositorio ARENA XVIII. Ele distingue conclusao tecnica de conclusao de governanca e nao executa merges, commits, push, fechamento de Issues ou exclusao de branches.

## Dados reais confirmados

- Repositorio: `ArenaXVIII/arena-xviii-backend`.
- Branch principal remota: `main`.
- Branch atual de trabalho: `feature/uc03-material-11-http-contracts`.
- Branch historica de containerizacao/persistencia: `feature/uc03-material-09-postgres-typeorm`.
- Epic real: [#12 - UC03 Divulgar Evento](https://github.com/ArenaXVIII/arena-xviii-backend/issues/12).
- Sub-Issues reais: #13 a #19.
- Estado publico confirmado das Issues #12 a #19: abertas.
- Resumo publico da Epic #12: 7 sub-issues, 0 concluídas.
- PR aberto confirmado pela API publica: nenhum.
- CLI `gh`: nao instalada ou nao disponivel neste ambiente.
- Configuracao Git: o remote `origin` aponta para `ArenaXVIII/arena-xviii-backend`.

## Estado local nao integrado

A branch atual possui alteracoes locais das etapas anteriores:

- alteracoes em Controllers HTTP;
- mappers HTTP em `src/modules/events/mappers/`;
- testes HTTP e configuracao de Vitest;
- oito artefatos do Material 11;
- oito artefatos do Material 12;
- alteracoes documentais dos Materiais 10, 11 e 12.

Essas alteracoes nao devem ser tratadas como integradas apenas por existirem no workspace. Nenhum commit ou PR desta etapa foi criado.

---

# Secao 1 - Visao geral: o caso de uso ja esta concluido?

## 1.1 Dimensao tecnica e didatica

### Evidencias validadas

| Area | Evidencia real | Situacao |
|---|---|---|
| Build | `pnpm build` aprovado | Concluido |
| Lint | `pnpm lint` aprovado com 0 erros | Concluido |
| Testes rapidos | `pnpm test`: 6 arquivos, 21 testes aprovados | Concluido |
| Integracao PostgreSQL | `pnpm test:integration`: 1 arquivo, 1 teste aprovado no banco isolado | Concluido |
| Containerizacao | Docker Compose ativo; API `Up`; PostgreSQL dev `healthy`; banco de testes `healthy` | Concluido |
| Migration | CreateEventsTable1794873600000 registrada como `[X]` | Concluido |
| Contrato do cadastro observado | `POST /events`: 201, 400 e 422 conforme semantica implementada | Concluido |
| Persistencia | Consulta SQL confirmou registro criado no banco de desenvolvimento | Concluido |
| Arquitetura | Cenário B confirmado; nenhum problema ativo justificou refatoracao | Concluido |
| Mappers HTTP | Campos publicos filtrados por mapeamento explicito | Concluido |

### Criterios gerais da Epic

| Criterio geral | Evidencia tecnica | Situacao formal |
|---|---|---|
| Evento planejado completo passa para divulgado e a alteracao persiste | Dominio e adaptadores implementados; testes rapidos e integracao aprovados | Parcial - falta rastreabilidade por Issue/PR e revisao humana |
| Evento inexistente rejeitado sem persistencia | Excecao e teste unitario existentes no repositorio | Parcial - falta execucao E2E e fechamento da Sub-Issue |
| Evento ja divulgado rejeitado sem persistencia | Excecao e teste unitario existentes | Parcial - falta execucao E2E |
| Evento em estado diferente rejeitado sem persistencia | Excecao e testes parametrizados existentes | Parcial - falta evidencia E2E |
| Planejamento incompleto rejeitado com campos ausentes | Dominio possui verificacao e excecao | Parcial - falta E2E e rastreabilidade |
| Falha de persistencia informada sem detalhes internos | FE01 ainda nao consta como contrato confirmado pelo projeto | Pendente |
| Ordem existencia - ja divulgado - Planejado - RN01 | Ordem implementada no dominio/service conforme testes unitarios | Parcial |
| Testes unitarios e E2E aprovados | Unitarios rapidos aprovados; E2E nao executado com banco confirmado | Pendente |
| Documentacao tecnica atualizada | Artefatos 10, 11 e 12 existem localmente | Parcial - falta integrar/PR/revisao |

Critérios tecnicos devem ser marcados como concluídos apenas depois da integracao dos PRs e da revisao humana. Os resultados atuais demonstram boa cobertura local, mas nao encerram formalmente a Epic.

## 1.2 Dimensao de governanca no GitHub

Conforme a API publica em 24/11/2026:

- Epic #12 continua aberta.
- Todas as Sub-Issues #13 a #19 continuam abertas.
- O resumo da Epic informa 0 sub-issues concluídas.
- Nenhum PR aberto foi encontrado.
- Nenhum PR ou merge desta etapa local foi criado.

Portanto, o UC03 nao esta formalmente concluido em governanca.

A Epic nao deve ser encerrada antes de:

1. revisao humana dos artefatos e das alteracoes locais;
2. integracao dos trabalhos aprovados na branch principal;
3. atualizacao rastreavel das Sub-Issues;
4. conclusao dos testes E2E em ambiente isolado;
5. verificacao final da matriz de rastreabilidade;
6. revisao da equipe e da Epic.

---

# Secao 2 - Mapa atual da cadeia de Pull Requests

## PRs confirmados no GitHub

| PR | Branch de origem | Base confirmada | Estado | Relacao com UC03 |
|---|---|---|---|---|
| [#103](https://github.com/ArenaXVIII/arena-xviii-backend/pull/103) | `feature/uc03-events-http` | `main` | Merged | Interface HTTP / Sub-Issue #17 |
| [#104](https://github.com/ArenaXVIII/arena-xviii-backend/pull/104) | `feature/material-08-integracao-persistencia` | `main` | Merged | Integracao anterior / evidencias do slice |
| [#105](https://github.com/ArenaXVIII/arena-xviii-backend/pull/105) | `feature/uc03-material-09-postgres-typeorm` | `main` | Merged | Persistencia PostgreSQL / Sub-Issue #16 |

Os tres PRs confirmados foram integrados diretamente na `main`; nao existe uma cadeia empilhada aberta no momento.

```text
main
  <- PR #103 merged <- feature/uc03-events-http
  <- PR #104 merged <- feature/material-08-integracao-persistencia
  <- PR #105 merged <- feature/uc03-material-09-postgres-typeorm
```

## Work in progress local

```text
main
  <- branch futura para artifacts / HTTP contratos
     <- feature/uc03-material-11-http-contracts
```

Nao existe PR confirmado para a branch atual. Materiais 11 e 12, mappers HTTP e artefatos documentais continuam locais ou nao confirmados como integrados. Qualquer PR deve ser criado apenas quando o autor decidir versionar os arquivos.

---

# Secao 3 - Passo a passo operacional

## Passo 1 - Publicar o parecer arquitetural e decidir o versionamento

**O que fazer:** revisar o diff local e decidir quais arquivos realmente devem entrar no repositorio. Como o resultado foi Cenário B, nao crie commit ou PR artificial apenas para registrar uma refatoracao inexistente.

**Por que:** o diff local pode misturar alteracoes dos Materiais 10, 11 e 12 com documentos novos. Commitar seletivamente preserva rastreabilidade e evita `.env`, Docker ou artefatos locais.

**Git — inspecao somente leitura:**

```bash
git status
git diff
git diff --stat
git diff -- src/ test/
git diff -- docs/entregas/material-10/ docs/entregas/material-11/ docs/entregas/material-12/
git check-ignore .env
git ls-files .env
```

`git ls-files .env` deve nao listar o arquivo.

**Versionamento opcional, somente apos revisao humana:**

```bash
git add src/modules/events/controllers/events.controller.ts
git add src/modules/events/events.controller.ts
git add src/modules/events/mappers/
git add test/events-create.http-spec.ts
git add test/events-publish.http-spec.ts
git add vitest.config.ts
git add docs/entregas/material-10/
git add docs/entregas/material-11/
git add docs/entregas/material-12/
git diff --cached
git diff --cached --stat
```

Nao use `git add .`.

**Commit opcional, apenas quando houver autorizacao:**

```bash
git commit -m "test(events): document HTTP contract verification"
git push -u origin feature/uc03-material-11-http-contracts
```

**GitHub Web:**

1. Abra `https://github.com/ArenaXVIII/arena-xviii-backend`.
2. Compare a branch atual com `main`.
3. Crie um PR com base `main` e titulo que reflita o trabalho real.
4. Na descricao, vincule a Issue #17 ou a Issue apropriada sem afirmar que ela foi concluida automaticamente.
5. Anexe os resultados de build, lint, testes, Docker e o arquivo `12-08-revisao-github-checklist.md`.

Nao publique credenciais nem o conteudo de `.env`.

## Passo 2 - Retirar PRs do modo Draft

**O que fazer:** os PRs #103, #104 e #105 ja estao merged e nao precisam ser alterados para este trabalho.

Nao existe PR confirmado para a branch atual. Depois de criar e revisar o novo PR, siga apenas com `Ready for review` se ele estiver marcado como Draft.

**CLI, apos criar um PR real:**

```bash
gh pr ready <NUMERO_DO_NOVO_PR>
```

**Interface Web:** abra o PR, clique em `Ready for review` e confirme a revisao humana necessaria.

## Passo 3 - Realizar revisao tecnica humana

**O que fazer:** um revisor diferente do autor deve examinar:

- ausencia de `.env` e credenciais;
- preservacao de dominio, Service, Repository e mapper de persistencia;
- mappers HTTP separados;
- contratos 201, 400 e 422;
- teste fechado com propriedade interna simulada;
- build, lint e testes;
- banco isolado de testes;
- E2E nao executado contra banco de desenvolvimento;
- pendencias tecnicas e de governanca.

**Interface Web:**

1. Abra a aba `Files changed`.
2. Confirme os arquivos relacionados.
3. Execute `Review changes`.
4. Use `Approve`, `Request changes` ou `Comment`.

O GitHub nao permite auto-aprovacao. Este roteiro nao declara revisao humana realizada.

**Opcao CLI, somente em ambiente autorizado:**

```bash
gh pr view <NUMERO_DO_NOVO_PR>
gh pr checks <NUMERO_DO_NOVO_PR>
```

## Passo 4 - Integração segura na branch principal

**O que fazer:** nao existe cadeia empilhada aberta atual. Os PRs #103, #104 e #105 ja foram merged. O trabalho atual, se aprovado, deve usar um unico PR contra `main`.

> [!WARNING]
> Nunca use uma branch base temporaria como base final do trabalho atual. Exclua branches apenas depois de garantir que nenhum PR dependente aponta para elas. O projeto nao precisa apagar branches neste momento.

**Antes do merge:**

```bash
git fetch origin
git switch main
git pull --ff-only origin main
```

Atualize ou rebases a branch da atividade somente de forma consciente:

```bash
git switch feature/uc03-material-11-http-contracts
git rebase main
```

Se houver conflitos, resolva-os localmente, execute a bateria e reenvie apenas com autorizacao.

**Merge final, somente apos aprovacao:**

```bash
gh pr merge <NUMERO_DO_NOVO_PR> --merge
```

**Depois do merge:**

```bash
git fetch origin
git switch main
git pull --ff-only origin main
pnpm build
pnpm lint
pnpm test
docker compose up -d postgres-test
pnpm test:integration
```

Nao execute `pnpm test:e2e` antes de confirmar que todos os testes usam banco isolado e nao modificam o banco de desenvolvimento.

## Passo 5 - Concluir Sub-Issues e atualizar o Project

**O que fazer:** nao feche nenhuma Sub-Issue sem evidencias do PR integrado e dos criterios correspondentes.

| Sub-Issue | Entrega principal | Estado atual confirmado | Fechamento |
|---|---|---|---|
| #13 | Dominio e transicao | Aberta | A confirmar por evidencias de PR, testes unitarios e decisoes D01/D02 |
| #14 | Contratos e DTO | Aberta | A confirmar por PR integrado e criterios da Issue |
| #15 | Service | Aberta | A confirmar por PR integrado e testes do Service |
| #16 | Adaptador PostgreSQL | Aberta; PR #105 merged | Verificar se criterios da Issue estao atendidos antes de fechar |
| #17 | API HTTP | Aberta; PR #103 merged | Verificar resposta e criterios antes de fechar |
| #18 | E2E seguro | Aberta | Permanece pendente ate testes E2E com banco isolado |
| #19 | Documentacao | Aberta | Verificar documentacao integrada e revisao humana antes de fechar |

**Interface Web:** na Issue correspondente, adicione comentario com links do PR, evidencia de teste e status da revisao. Confirme os checkboxes no conteudo da Issue e mova o card para `Done` somente apos fechamento.

**CLI, apos integracao e revisao humanas:**

```bash
gh issue close 13 --repo ArenaXVIII/arena-xviii-backend --comment "Concluida apenas após revisão humana e evidências do PR integrado."
gh issue close 14 --repo ArenaXVIII/arena-xviii-backend --comment "Concluida após o PR dos contratos e a bateria build/lint aprovada."
gh issue close 15 --repo ArenaXVIII/arena-xviii-backend --comment "Concluida após o PR do Service e testes unitários aprovados."
gh issue close 16 --repo ArenaXVIII/arena-xviii-backend --comment "Persistência confirmada pelo PR #105 e pela integração PostgreSQL isolada."
gh issue close 17 --repo ArenaXVIII/arena-xviii-backend --comment "API confirmada pelo PR #103 e pelas verificações HTTP containerizadas."
gh issue close 18 --repo ArenaXVIII/arena-xviii-backend --comment "Fechar somente após testes E2E seguros em banco isolado."
gh issue close 19 --repo ArenaXVIII/arena-xviii-backend --comment "Fechar após integração e revisão da documentação técnica."
```

Nao execute esses comandos agora. Adapte os comentarios apos revisar quais criterios realmente foram atendidos.

**GitHub Project:** abra o Project Arena XVIII #3 e mova cada card para `Done` somente depois do fechamento rastreavel da respectiva Issue.

## Passo 6 - Marcar criterios e encerrar formalmente a Epic

**O que fazer:** somente depois de fechar as Sub-Issues e integrar tudo em `main`, marque os criterios gerais da Epic #12 com evidencias.

Atualize o corpo da Epic com links:

- PRs #103, #104 e #105;
- novo PR dos Materiais 11 e 12, se criado;
- logs ou links dos testes build/lint/test/test:integration;
- resultado seguro dos testes E2E;
- artefatos em `docs/entregas/material-11/` e `docs/entregas/material-12/`;
- matriz de rastreabilidade.

**Apos atender todas as condicoes de conclusao:**

```bash
gh issue close 12 --repo ArenaXVIII/arena-xviii-backend --comment "UC03 concluído após integração na main, revisão humana, Sub-Issues fechadas e evidências rastreáveis."
```

Nao execute este comando neste momento. A Epic continua aberta publicamente e o resumo confirma 0 sub-issues concluídas.

**Interface Web:** confirme que todas as Sub-Issues estao fechadas, marque os critérios gerais da Epic e mova o card #12 para `Done`.

---

# Pendencias restantes

## Tecnicas

- Confirmar o estado integrado dos testes de dominio, Service e E2E em relação às regras RN01 e FA01-FA04.
- Executar E2E somente contra banco isolado e com limpeza limitada aos dados criados.
- Confirmar o contrato FE01 de falha de persistencia.
- Integrar o PR real dos Materiais 11 e 12.
- Executar bateria final em `main`.
- Confirmar que a matriz de rastreabilidade cobre todas as regras.

## Governanca

- Instalar ou disponibilizar `gh` antes de usar os comandos de CLI.
- Autenticar o `gh` e confirmar permissões de Issue, PR e Project.
- Obter revisao humana.
- Fechar #13 a #19 apenas com evidencias.
- Fechar #12 apenas depois de todas as Sub-Issues e criterios.
- Atualizar Project Arena XVIII #3.
- Nao declarar aprovação humana ou merge no documento sem evidencias reais.
