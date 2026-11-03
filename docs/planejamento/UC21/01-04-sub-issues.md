# Artefato 4 — Sub-Issues

**Épico:** `[UC21] Registrar Treino`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC21][SUB-01] Modelar a entidade Treino e suas regras

**Épico:** [UC21] Registrar Treino

### Objetivo
Garantir no domínio as regras do registro de treino, independentemente da camada de entrada.

### Descrição
Criar a entidade `Training` vinculada a uma equipe, com data e horário obrigatórios. **O fluxo de treinos não foi detalhado.** Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC21-01, RN-UC21-02, FP-3, FP-4, FA02

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `Training` consistente com a pós-condição de sucesso.
- [ ] FA02 — Data ou horário não informados: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] RN-UC21-01 — "Todo treino pertence a uma equipe": verificada por teste unitário.
- [ ] RN-UC21-02 — "O treino deve possuir data e horário": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
Nenhuma dependência interna.

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:feature`, `layer:domain`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC21][SUB-02] Definir os contratos de aplicação do registro de treino

**Épico:** [UC21] Registrar Treino

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do registro de treino.

### Descrição
Definir os DTOs de entrada e de resposta, a porta de repositório `ITrainingRepository`, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-6, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `teamId`, `date`, `time`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] A porta `ITrainingRepository` (com token de injeção) declara: findById, save.
- [ ] Existe exceção dedicada para FA01 (Equipe não encontrada).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01.

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC21][SUB-03] Implementar o serviço de aplicação do registro de treino

**Épico:** [UC21] Registrar Treino

### Objetivo
Orquestrar o fluxo principal do registro de treino na camada de aplicação.

### Descrição
Implementar o método `registerTraining` no serviço do módulo Esportes: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-5, FP-6, FA01, FE01, RN-UC21-01

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Equipe não encontrada: lança a exceção correspondente e nada é persistido.
- [ ] Nas rejeições do domínio (FA02), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02; UC20 · SUB-02 (porta de repositório de equipe).

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC21][SUB-04] Implementar o adaptador de persistência de treinos

**Épico:** [UC21] Registrar Treino

### Objetivo
Fornecer implementação concreta da persistência do registro de treino.

### Descrição
Implementar `ITrainingRepository`. **Proposta técnica (H03):** adaptador em memória, substituível futuramente sem alterar domínio e aplicação, com carga de dados para os testes e2e.

### Origem
FP-2, FP-5

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
SUB-01; SUB-02.

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:feature`, `layer:infra`, `priority:medium`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC21][SUB-05] Expor o registro de treino via API HTTP

**Épico:** [UC21] Registrar Treino

### Objetivo
Disponibilizar o registro de treino ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /teams/:teamId/trainings`) no controller do módulo Esportes, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `SportsModule` (criando o módulo, se ainda não existir).

### Origem
FP-1, FP-6, FA01, FA02, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /teams/:teamId/trainings` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Equipe não encontrada) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Data ou horário não informados) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `SportsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; SUB-04; UC19 · SUB-05 (criação do `SportsModule`).

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:feature`, `layer:api`, `priority:high`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC21][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de treino

**Épico:** [UC21] Registrar Treino

### Objetivo
Verificar o registro de treino atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FE01, RN-UC21-01, RN-UC21-02, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O treino está registrado, vinculado à equipe, e foi persistido.").
- [ ] FA01 (Equipe não encontrada): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum treino é criado.").
- [ ] FA02 (Data ou horário não informados): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum treino é criado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; SUB-04; UC20 · SUB-04 (adaptador de persistência de equipe).

### Labels sugeridas
`module:esportes`, `uc:UC21`, `type:test`, `layer:api`, `priority:medium`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC21][SUB-07] Documentar tecnicamente o registro de treino

**Épico:** [UC21] Registrar Treino

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do registro de treino.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC21, Dúvidas em aberto da especificação

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
`module:esportes`, `uc:UC21`, `type:documentation`, `priority:low`, `spec:requer-modelagem`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
