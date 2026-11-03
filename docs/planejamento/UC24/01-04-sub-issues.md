# Artefato 4 — Sub-Issues

**Épico:** `[UC24] Cadastrar Material`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC24][SUB-01] Modelar o Objeto de Valor Quantidade

**Épico:** [UC24] Cadastrar Material

### Objetivo
Representar Quantidade como Objeto de Valor reutilizável, garantindo sua validade no domínio.

### Descrição
Criar o Objeto de Valor `Quantity`, imutável e validado na construção, com testes unitários próprios.

### Origem
RN-UC24-02, FA02, Seção 5 do modelo conceitual (Objetos de Valor)

### Escopo e responsabilidades
- **Inclui:** Objeto de Valor, validação na construção e testes unitários.
- **Não inclui:** Entidades que usam o Objeto de Valor.

### Critérios de aceite
- [ ] A Quantidade rejeita valores negativos (RN-UC24-02 — proposta técnica, validar).
- [ ] A Quantidade oferece operações de soma e subtração que preservam a invariante de não negatividade (base para o UC25).
- [ ] O Objeto de Valor fica em local compartilhado (proposta: `src/common/value-objects/`) ou no módulo de Estoque.
- [ ] Testes unitários do Objeto de Valor aprovados (`pnpm test`).

### Dependências
Nenhuma dependência interna.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do Objeto de Valor.

---

## [UC24][SUB-02] Modelar a entidade Material e suas regras

**Épico:** [UC24] Cadastrar Material

### Objetivo
Garantir no domínio as regras do cadastro de material, independentemente da camada de entrada.

### Descrição
Criar a entidade `Material` com nome obrigatório e Quantidade inicial, controlada por quantidade (hipótese RN-UC24-03). Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC24-01, RN-UC24-02, RN-UC24-03, FP-2, FP-3, FP-4, FA01, FA02

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `Material` consistente com a pós-condição de sucesso.
- [ ] FA01 — Nome não informado: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] FA02 — Quantidade ausente ou negativa: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] RN-UC24-01 — "O material deve possuir um nome não vazio": verificada por teste unitário.
- [ ] RN-UC24-02 — "A quantidade do material não pode ser negativa": verificada por teste unitário.
- [ ] RN-UC24-03 — "O material é controlado por quantidade": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
SUB-01.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC24][SUB-03] Definir os contratos de aplicação do cadastro de material

**Épico:** [UC24] Cadastrar Material

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do cadastro de material.

### Descrição
Definir os DTOs de entrada e de resposta, a porta de repositório `IMaterialRepository`, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-6, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `name`, `initialQuantity`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] A porta `IMaterialRepository` (com token de injeção) declara: findById, save.
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-02.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC24][SUB-04] Implementar o serviço de aplicação do cadastro de material

**Épico:** [UC24] Cadastrar Material

### Objetivo
Orquestrar o fluxo principal do cadastro de material na camada de aplicação.

### Descrição
Implementar o método `createMaterial` no serviço do módulo Estoque: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-5, FP-6, FE01

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] Nas rejeições do domínio (FA01, FA02), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-02; SUB-03.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC24][SUB-05] Implementar o adaptador de persistência de materiais

**Épico:** [UC24] Cadastrar Material

### Objetivo
Fornecer implementação concreta da persistência do cadastro de material.

### Descrição
Implementar `IMaterialRepository`. **Proposta técnica (H03):** adaptador em memória, substituível futuramente sem alterar domínio e aplicação, com carga de dados para os testes e2e.

### Origem
FP-5

### Escopo e responsabilidades
- **Inclui:** Adaptador de persistência e seus testes.
- **Não inclui:** Escolha definitiva de banco de dados e migrações.

### Critérios de aceite
- [ ] `findById` retorna a instância correspondente ou `null`.
- [ ] `save` persiste a instância e uma leitura posterior reflete o estado salvo.
- [ ] Alterações em instâncias ainda não salvas não modificam o armazenamento (isolamento).
- [ ] Testes do adaptador aprovados.
- [ ] A decisão H03 foi confirmada pela equipe.

### Dependências
SUB-02; SUB-03.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC24][SUB-06] Expor o cadastro de material via API HTTP

**Épico:** [UC24] Cadastrar Material

### Objetivo
Disponibilizar o cadastro de material ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /materials`) no controller do módulo Estoque, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `InventoryModule` (criando o módulo, se ainda não existir).

### Origem
FP-1, FP-6, FA01, FA02, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /materials` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Nome não informado) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FA02 (Quantidade ausente ou negativa) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O `InventoryModule` foi criado com controller, serviço e provedores e está registrado no `AppModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-04; SUB-05.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC24][SUB-07] Implementar os testes de integração ponta a ponta (e2e) do cadastro de material

**Épico:** [UC24] Cadastrar Material

### Objetivo
Verificar o cadastro de material atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FE01, RN-UC24-01, RN-UC24-02, RN-UC24-03, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O material está cadastrado, com quantidade inicial, e foi persistido.").
- [ ] FA01 (Nome não informado): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum material é criado.").
- [ ] FA02 (Quantidade ausente ou negativa): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum material é criado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-06; SUB-05.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC24][SUB-08] Documentar tecnicamente o cadastro de material

**Épico:** [UC24] Cadastrar Material

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cadastro de material.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC24, Dúvidas em aberto da especificação

### Escopo e responsabilidades
- **Inclui:** Documentação técnica e registro de decisões.
- **Não inclui:** Documentação de outros casos de uso.

### Critérios de aceite
- [ ] O contrato da rota está documentado e coincide com o comportamento verificado nos testes e2e.
- [ ] As decisões sobre as propostas técnicas e as dúvidas em aberto estão registradas com o resultado.
- [ ] O status da especificação em `docs/casos-de-uso.md` foi atualizado após a validação.
- [ ] Um membro da equipe diferente do autor revisou a documentação.

### Dependências
SUB-06; SUB-07.

### Labels sugeridas
`module:estoque`, `uc:UC24`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
