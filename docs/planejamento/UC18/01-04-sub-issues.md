# Artefato 4 — Sub-Issues

**Épico:** `[UC18] Vincular Associado a Modalidade`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC18][SUB-01] Modelar a entidade Vínculo Associado–Modalidade e suas regras

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Garantir no domínio as regras do vínculo entre associado e modalidade, independentemente da camada de entrada.

### Descrição
Criar a entidade de associação `MemberModality` entre associado e modalidade, sem duplicidade do par. **A cardinalidade N:N ainda é hipótese.** Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC18-01, RN-UC18-03, FP-5

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `MemberModality` consistente com a pós-condição de sucesso.
- [ ] RN-UC18-01 — "O vínculo exige um associado e uma modalidade existentes": verificada por teste unitário.
- [ ] RN-UC18-03 — "Um associado pode participar de mais de uma modalidade": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
Nenhuma dependência interna.

### Labels sugeridas
`module:associados`, `uc:UC18`, `type:feature`, `layer:domain`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC18][SUB-02] Definir os contratos de aplicação do vínculo entre associado e modalidade

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do vínculo entre associado e modalidade.

### Descrição
Definir os DTOs de entrada e de resposta, a porta de repositório `IMemberModalityRepository`, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-3, FP-4, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `memberId`, `modalityId`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] A porta `IMemberModalityRepository` (com token de injeção) declara: findById, save, consulta de duplicidade.
- [ ] Existe exceção dedicada para FA01 (Associado não encontrado).
- [ ] Existe exceção dedicada para FA02 (Modalidade não encontrada).
- [ ] Existe exceção dedicada para FA03 (Vínculo já existente).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01.

### Labels sugeridas
`module:associados`, `uc:UC18`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC18][SUB-03] Implementar o serviço de aplicação do vínculo entre associado e modalidade

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Orquestrar o fluxo principal do vínculo entre associado e modalidade na camada de aplicação.

### Descrição
Implementar o método `linkMemberToModality` no serviço do módulo Associados: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-3, FP-4, FP-6, FP-7, FA01, FA02, FA03, FE01, RN-UC18-01, RN-UC18-02

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Associado não encontrado: lança a exceção correspondente e nada é persistido.
- [ ] FA02 — Modalidade não encontrada: lança a exceção correspondente e nada é persistido.
- [ ] FA03 — Vínculo já existente: lança a exceção correspondente e nada é persistido.
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02; UC17 · SUB-02 (porta de repositório de associado); UC19 · SUB-02 (porta de repositório de modalidade).

### Labels sugeridas
`module:associados`, `uc:UC18`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC18][SUB-04] Implementar o adaptador de persistência de vínculos

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Fornecer implementação concreta da persistência do vínculo entre associado e modalidade.

### Descrição
Implementar `IMemberModalityRepository`. **Proposta técnica (H03):** adaptador em memória, substituível futuramente sem alterar domínio e aplicação, com carga de dados para os testes e2e.

### Origem
FP-2, FP-3, FP-4, FP-6, FA03, RN-UC18-02

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
`module:associados`, `uc:UC18`, `type:feature`, `layer:infra`, `priority:medium`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC18][SUB-05] Expor o vínculo associado–modalidade via API HTTP

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Disponibilizar o vínculo associado–modalidade ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /members/:memberId/modalities`) no controller do módulo Associados, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `MembersModule` (criando o módulo, se ainda não existir).

### Origem
FP-1, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /members/:memberId/modalities` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Associado não encontrado) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Modalidade não encontrada) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA03 (Vínculo já existente) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `MembersModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; SUB-04; UC17 · SUB-05 (criação do `MembersModule`).

### Labels sugeridas
`module:associados`, `uc:UC18`, `type:feature`, `layer:api`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC18][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do vínculo entre associado e modalidade

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Verificar o vínculo associado–modalidade atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FE01, RN-UC18-01, RN-UC18-02, RN-UC18-03, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O vínculo está registrado e foi persistido.").
- [ ] FA01 (Associado não encontrado): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum vínculo é criado.").
- [ ] FA02 (Modalidade não encontrada): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum vínculo é criado.").
- [ ] FA03 (Vínculo já existente): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum vínculo é criado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; SUB-04; UC17 · SUB-04 (adaptador de persistência de associado); UC19 · SUB-04 (adaptador de persistência de modalidade).

### Labels sugeridas
`module:associados`, `uc:UC18`, `type:test`, `layer:api`, `priority:medium`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC18][SUB-07] Documentar tecnicamente o vínculo associado–modalidade

**Épico:** [UC18] Vincular Associado a Modalidade

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do vínculo entre associado e modalidade.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC18, Dúvidas em aberto da especificação

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
`module:associados`, `uc:UC18`, `type:documentation`, `priority:low`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
