# Artefato 4 — Sub-Issues

**Épico:** `[UC01] Cadastrar Evento`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC01][SUB-01] Implementar no domínio a criação de evento

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Garantir no domínio as regras do cadastro de evento, independentemente da camada de entrada.

### Descrição
Criar a operação de fábrica da entidade `Event` (ex.: `Event.create(name)`), que valida o nome e inicia o evento no estado `planning`. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC01-01, RN-UC01-02, FP-2, FP-3, FA01

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `Event` consistente com a pós-condição de sucesso.
- [ ] FA01 — Nome não informado ou vazio: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] RN-UC01-01 — "Todo evento cadastrado inicia no estado Planejamento": verificada por teste unitário.
- [ ] RN-UC01-02 — "O evento deve possuir um nome não vazio": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
#13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`).

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC01][SUB-02] Definir os contratos de aplicação do cadastro de evento

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do cadastro de evento.

### Descrição
Definir os DTOs de entrada e de resposta, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-5, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `name`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01; #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01).

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC01][SUB-03] Implementar o serviço de aplicação do cadastro de evento

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Orquestrar o fluxo principal do cadastro de evento na camada de aplicação.

### Descrição
Implementar o método `createEvent` no serviço do módulo Eventos: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-4, FP-5, FE01, RN-UC01-03

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] Nas rejeições do domínio (FA01), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02.

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC01][SUB-04] Estender o adaptador de persistência de eventos para o cadastro

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Fornecer implementação concreta da persistência do cadastro de evento.

### Descrição
Estender o adaptador de eventos (#16) para registrar novos eventos e gerar identificador único.

### Origem
FP-4, RN-UC01-03

### Escopo e responsabilidades
- **Inclui:** Adaptador de persistência e seus testes.
- **Não inclui:** Escolha definitiva de banco de dados e migrações.

### Critérios de aceite
- [ ] O adaptador registra um novo evento e gera identificador único.
- [ ] Uma leitura posterior por identificador retorna o evento em `planning`.
- [ ] Em falha de gravação, nenhum evento permanece registrado.
- [ ] Testes do adaptador aprovados.

### Dependências
SUB-01; SUB-02; #16 (UC03 · SUB-04 — adaptador de persistência de eventos).

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC01][SUB-05] Expor o cadastro de evento via API HTTP

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Disponibilizar o cadastro de evento ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /events`) no controller do módulo Eventos, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `EventsModule`.

### Origem
FP-1, FP-5, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /events` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Nome não informado ou vazio) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `EventsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; SUB-04; #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`).

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC01][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Verificar o cadastro de evento atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FE01, RN-UC01-01, RN-UC01-02, RN-UC01-03, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O evento existe, está no estado Planejamento e foi persistido.").
- [ ] FA01 (Nome não informado ou vazio): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum evento é criado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; SUB-04.

### Labels sugeridas
`module:eventos`, `uc:UC01`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC01][SUB-07] Documentar tecnicamente o cadastro de evento

**Épico:** [UC01] Cadastrar Evento

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cadastro de evento.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC01, Dúvidas em aberto da especificação

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
`module:eventos`, `uc:UC01`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
