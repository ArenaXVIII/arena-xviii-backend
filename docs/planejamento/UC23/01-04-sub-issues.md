# Artefato 4 — Sub-Issues

**Épico:** `[UC23] Inscrever Equipe em Campeonato`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC23][SUB-01] Modelar a entidade Participação em Campeonato e suas regras

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Garantir no domínio as regras da inscrição de equipe em campeonato, independentemente da camada de entrada.

### Descrição
Criar a entidade de associação `TeamChampionship` entre equipe e campeonato, sem duplicidade do par. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC23-01, RN-UC23-03, FP-5

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `TeamChampionship` consistente com a pós-condição de sucesso.
- [ ] RN-UC23-01 — "A inscrição exige uma equipe e um campeonato existentes": verificada por teste unitário.
- [ ] RN-UC23-03 — "Uma equipe pode participar de vários campeonatos e um campeonato pode reunir várias equipes": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
Nenhuma dependência interna.

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC23][SUB-02] Definir os contratos de aplicação da inscrição de equipe em campeonato

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro da inscrição de equipe em campeonato.

### Descrição
Definir os DTOs de entrada e de resposta, a porta de repositório `ITeamChampionshipRepository`, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-3, FP-4, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `championshipId`, `teamId`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] A porta `ITeamChampionshipRepository` (com token de injeção) declara: findById, save, consulta de duplicidade.
- [ ] Existe exceção dedicada para FA01 (Equipe não encontrada).
- [ ] Existe exceção dedicada para FA02 (Campeonato não encontrado).
- [ ] Existe exceção dedicada para FA03 (Equipe já inscrita no campeonato).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01.

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC23][SUB-03] Implementar o serviço de aplicação da inscrição de equipe em campeonato

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Orquestrar o fluxo principal da inscrição de equipe em campeonato na camada de aplicação.

### Descrição
Implementar o método `enrollTeam` no serviço do módulo Esportes: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-3, FP-4, FP-6, FP-7, FA01, FA02, FA03, FE01, RN-UC23-01, RN-UC23-02

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Equipe não encontrada: lança a exceção correspondente e nada é persistido.
- [ ] FA02 — Campeonato não encontrado: lança a exceção correspondente e nada é persistido.
- [ ] FA03 — Equipe já inscrita no campeonato: lança a exceção correspondente e nada é persistido.
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02; UC20 · SUB-02 (porta de repositório de equipe); UC22 · SUB-03 (porta de repositório de campeonato).

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC23][SUB-04] Implementar o adaptador de persistência de participações

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Fornecer implementação concreta da persistência da inscrição de equipe em campeonato.

### Descrição
Implementar `ITeamChampionshipRepository`. **Proposta técnica (H03):** adaptador em memória, substituível futuramente sem alterar domínio e aplicação, com carga de dados para os testes e2e.

### Origem
FP-2, FP-3, FP-4, FP-6, FA03, RN-UC23-02

### Escopo e responsabilidades
- **Inclui:** Adaptador de persistência e seus testes.
- **Não inclui:** Escolha definitiva de banco de dados e migrações.

### Critérios de aceite
- [ ] `findById` retorna a instância correspondente ou `null`.
- [ ] `save` persiste a instância e uma leitura posterior reflete o estado salvo.
- [ ] A consulta de duplicidade identifica registros existentes (FA03).
- [ ] Alterações em instâncias ainda não salvas não modificam o armazenamento (isolamento).
- [ ] Testes do adaptador aprovados.
- [ ] A decisão H03 foi confirmada pela equipe.

### Dependências
SUB-01; SUB-02.

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC23][SUB-05] Expor a inscrição de equipe em campeonato via API HTTP

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Disponibilizar a inscrição de equipe em campeonato ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /championships/:championshipId/teams`) no controller do módulo Esportes, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `SportsModule` (criando o módulo, se ainda não existir).

### Origem
FP-1, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /championships/:championshipId/teams` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Equipe não encontrada) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Campeonato não encontrado) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA03 (Equipe já inscrita no campeonato) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `SportsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; SUB-04; UC19 · SUB-05 (criação do `SportsModule`).

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC23][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da inscrição de equipe em campeonato

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Verificar a inscrição de equipe em campeonato atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FE01, RN-UC23-01, RN-UC23-02, RN-UC23-03, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("A participação está registrada e foi persistida.").
- [ ] FA01 (Equipe não encontrada): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhuma participação é criada.").
- [ ] FA02 (Campeonato não encontrado): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhuma participação é criada.").
- [ ] FA03 (Equipe já inscrita no campeonato): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhuma participação é criada.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; SUB-04; UC20 · SUB-04 (adaptador de persistência de equipe); UC22 · SUB-05 (adaptador de persistência de campeonato).

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC23][SUB-07] Documentar tecnicamente a inscrição de equipe em campeonato

**Épico:** [UC23] Inscrever Equipe em Campeonato

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da inscrição de equipe em campeonato.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC23, Dúvidas em aberto da especificação

### Escopo e responsabilidades
- **Inclui:** Documentação técnica e registro de decisões.
- **Não inclui:** Documentação de outros casos de uso.

### Critérios de aceite
- [ ] O contrato da rota está documentado e coincide com o comportamento verificado nos testes e2e.
- [ ] As decisões sobre as propostas técnicas e as dúvidas em aberto estão registradas com o resultado.
- [ ] O status da especificação em `docs/casos-de-uso.md` foi atualizado após a validação.
- [ ] Um membro da equipe diferente do autor revisou a documentação.

### Dependências
SUB-05; SUB-06.

### Labels sugeridas
`module:esportes`, `uc:UC23`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
