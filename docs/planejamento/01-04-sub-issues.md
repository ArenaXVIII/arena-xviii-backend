# Artefato 4 — Sub-Issues

**Épico:** `[UC03] Divulgar Evento`

Cada bloco abaixo corresponde a uma Issue independente. Copie, a partir do título, o conteúdo de cada Sub-Issue para o GitHub. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [SUB-01] Modelar a entidade Evento e a transição de divulgação

**Épico:** [UC03] Divulgar Evento

### Objetivo
Garantir, na camada de domínio, que a transição Planejado → Divulgado só ocorra quando as regras do UC03 forem atendidas.

### Descrição
Revisar e completar o código preexistente em:
- `src/common/enum/event-status.enum.ts`
- `src/modules/events/entities/event.entity.ts`
- `src/common/exceptions/event-already-published.exception.ts`
- `src/common/exceptions/event-not-planned.exception.ts`
- `src/common/exceptions/event-planning-incomplete.exception.ts`

O método `publish()` da entidade deve:
1. rejeitar evento já Divulgado (FA02);
2. rejeitar evento em estado diferente de Planejado (FA03);
3. verificar os campos da RN01 (data, local, orçamento, responsáveis e atrações/atividades) e rejeitar com a lista de campos ausentes (FA04);
4. alterar o estado para Divulgado e atualizar a data de modificação somente quando todas as verificações passarem.

Criar testes unitários **da entidade**, independentes do serviço (por exemplo, `event.entity.spec.ts`).

### Origem
RN01, RN-UC03-01, RN-UC03-02; FP-3, FP-4, FP-5; FA02, FA03, FA04.

### Escopo e responsabilidades
- **Inclui:** enum de estados, entidade, exceções de domínio de FA02, FA03 e FA04, testes unitários da entidade.
- **Não inclui:** acesso a repositório, DTO e camada HTTP.

### Critérios de aceite
- [ ] `publish()` em evento Planejado com todos os campos da RN01 altera o estado para `published` e atualiza `updatedAt`.
- [ ] `publish()` em evento `published` lança `EventAlreadyPublishedException`.
- [ ] `publish()` em evento em qualquer estado diferente de `planned` e `published` lança `EventNotPlannedException` (teste parametrizado com todos os estados do enum).
- [ ] `publish()` com campos ausentes lança `EventPlanningIncompleteException`, e `missingFields` contém exatamente os campos ausentes.
- [ ] Cada campo da RN01 tem um teste isolado de ausência.
- [ ] Em qualquer rejeição, o estado e o `updatedAt` permanecem inalterados.
- [ ] A ordem de verificação segue a especificação: já divulgado → Planejado → RN01.
- [ ] O tratamento de orçamento zero (D01) e de data no passado (D02) segue a decisão registrada pela equipe.

### Dependências
Nenhuma.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:feature`, `layer:domain`, `priority:high`

### Responsável
@LunaRibeiro

### Estado inicial
`Ready`

### Evidências esperadas
- Link do PR com a entidade e os testes unitários.
- Saída de `pnpm test` com os testes da entidade aprovados.
- Registro da decisão sobre D01 e D02 no PR ou na Issue.

---

## [SUB-02] Definir os contratos de aplicação (porta de repositório e DTO de resposta)

**Épico:** [UC03] Divulgar Evento

### Objetivo
Estabelecer contratos estáveis entre as camadas de aplicação, infraestrutura e interface.

### Descrição
Revisar e completar o código preexistente em:
- `src/modules/events/repositories/events.repository.interface.ts` (`IEventsRepository`, token `EVENTS_REPOSITORY`)
- `src/modules/events/dtos/publish-event-response.dto.ts` (`PublishEventResponseDto`)
- `src/common/exceptions/event-not-found.exception.ts` (FA01)

Definir o contrato de erro de FE01. A proposta técnica H04 sugere uma exceção específica de falha de persistência.

### Origem
FP-2, FP-6, FP-7; FA01; FE01.

### Escopo e responsabilidades
- **Inclui:** interface do repositório (`findEventById`, `save`), DTO de resposta (identificador, estado, data de atualização, mensagem), exceção de FA01 e contrato de erro de FE01.
- **Não inclui:** implementação concreta do repositório e lógica de orquestração.

### Critérios de aceite
- [ ] `IEventsRepository` declara `findEventById(eventId): Promise<Event | null>` e `save(event): Promise<Event>`.
- [ ] O token de injeção `EVENTS_REPOSITORY` é exportado e documentado.
- [ ] `PublishEventResponseDto` contém `eventId`, `status`, `updatedAt` e `message`.
- [ ] Existe uma exceção dedicada a FA01 (`EventNotFoundException`).
- [ ] Existe um contrato definido para FE01, aprovado pela equipe (H04).
- [ ] O padrão de idioma das mensagens está definido e aplicado de forma consistente.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01 (os contratos referenciam `Event` e `EventStatus`).

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:feature`, `layer:application`, `priority:high`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com os contratos.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [SUB-03] Implementar o serviço de aplicação de divulgação

**Épico:** [UC03] Divulgar Evento

### Objetivo
Orquestrar o fluxo principal do UC03 na camada de aplicação.

### Descrição
Revisar e completar `src/modules/events/services/events.service.ts` e `events.service.spec.ts`. O método `publishEvent(eventId)` deve:
1. localizar o evento pelo repositório (FP-2) e lançar a exceção de FA01 quando ele não existir;
2. delegar as verificações a `event.publish()` (FP-3 a FP-5);
3. persistir por meio de `save` somente após o sucesso da transição (FP-6, RN-UC03-03);
4. converter falhas de persistência no contrato de FE01;
5. retornar `PublishEventResponseDto` (FP-7).

### Origem
FP-1 a FP-7; FA01–FA04; FE01; RN-UC03-03.

### Escopo e responsabilidades
- **Inclui:** orquestração, tratamento de FA01 e FE01, testes unitários com repositório simulado.
- **Não inclui:** regras da RN01 (ficam no domínio, SUB-01), implementação do repositório e camada HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso retorna o DTO com estado `published`, e `save` é chamado uma única vez com o evento atualizado.
- [ ] Um evento inexistente lança a exceção de FA01, e `save` não é chamado.
- [ ] Nos casos FA02, FA03 e FA04, a exceção do domínio é propagada e `save` **não** é chamado (verificação explícita em cada teste).
- [ ] Quando `save` falha, o serviço lança o erro de FE01.
- [ ] Os testes unitários de `events.service.spec.ts` estão aprovados.

### Dependências
SUB-01, SUB-02.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:feature`, `layer:application`, `priority:high`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com todos os cenários do serviço aprovados.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [SUB-04] Implementar o adaptador de persistência de eventos

**Épico:** [UC03] Divulgar Evento

### Objetivo
Fornecer uma implementação concreta de `IEventsRepository`.

### Descrição
Criar um adaptador que implemente `IEventsRepository`. **Proposta técnica H03:** como a tecnologia de banco de dados ainda não foi definida, implementar inicialmente um repositório **em memória** (por exemplo, `src/modules/events/repositories/in-memory-events.repository.ts`), substituível futuramente sem alterar domínio e aplicação. O adaptador deve permitir a carga de eventos de teste (seed) para os testes e2e.

### Origem
FP-2, FP-6; RN-UC03-03; pós-condições de sucesso e de falha.

### Escopo e responsabilidades
- **Inclui:** implementação de `findEventById` e `save`, isolamento do estado armazenado e testes do adaptador.
- **Não inclui:** escolha definitiva de banco de dados e migrações.

### Critérios de aceite
- [ ] `findEventById` retorna o evento correspondente ou `null` quando ele não existir.
- [ ] `save` persiste o novo estado, e uma leitura posterior retorna `published`.
- [ ] Mutações em uma instância de `Event` ainda não salva não alteram o estado armazenado (isolamento entre a instância em memória e o armazenamento).
- [ ] Os testes do adaptador estão aprovados.
- [ ] A equipe confirmou a decisão H03 (registrada na Issue).

### Dependências
SUB-01, SUB-02. Pode ser executada em paralelo com SUB-03.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:feature`, `layer:infra`, `priority:medium`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador aprovados.
- Comentário registrando a confirmação de H03.

---

## [SUB-05] Expor a divulgação via API HTTP e registrar o módulo de eventos

**Épico:** [UC03] Divulgar Evento

### Objetivo
Disponibilizar o UC03 ao ator por meio de uma interface HTTP.

### Descrição
- Criar `EventsController` com a rota de divulgação. **Proposta H01:** `PATCH /events/:eventId/publish`.
- Mapear as exceções para respostas HTTP. **Proposta H02:** FA01 → 404; FA02 e FA03 → 409; FA04 → 422, com `missingFields` no corpo; FE01 → 500. A implementação pode usar um *exception filter* ou a conversão para exceções HTTP do NestJS.
- Criar `EventsModule`, registrando o controller, o `EventsService` e o provedor `EVENTS_REPOSITORY` (adaptador de SUB-04).
- Importar `EventsModule` no `AppModule`.

### Origem
FP-1, FP-7; FA01–FA04 (rejeição informada ao ator); FE01 (falha informada ao ator).

### Escopo e responsabilidades
- **Inclui:** controller, mapeamento de erros, módulo e registro no `AppModule`.
- **Não inclui:** autenticação e autorização (H05) e regras de negócio.

### Critérios de aceite
- [ ] A rota aprovada pela equipe (H01) recebe o identificador do evento e retorna o `PublishEventResponseDto` no sucesso.
- [ ] Cada fluxo de rejeição retorna o código HTTP aprovado (H02) e uma mensagem descritiva.
- [ ] A resposta de FA04 contém a lista de campos ausentes.
- [ ] A resposta de FE01 informa a falha sem expor detalhes internos.
- [ ] `EventsModule` está registrado no `AppModule`, e a aplicação sobe com `pnpm start:dev`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03, SUB-04.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:feature`, `layer:api`, `priority:high`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplo de requisição e resposta (sucesso e cada erro) anexado ao PR.
- Registro da confirmação de H01 e H02.

---

## [SUB-06] Implementar os testes de integração ponta a ponta (e2e) do slice

**Épico:** [UC03] Divulgar Evento

### Objetivo
Verificar o comportamento do UC03 atravessando todas as camadas.

### Descrição
Criar `test/events-publish.e2e-spec.ts` usando Supertest e `vitest.config.e2e.ts`, com eventos carregados no adaptador de SUB-04. Para FE01, substituir o provedor `EVENTS_REPOSITORY` por um repositório que falha no `save`.

### Origem
FP completo; FA01, FA02, FA03, FA04, FE01; pós-condições de sucesso e de falha; RN-UC03-03.

### Escopo e responsabilidades
- **Inclui:** cenários e2e de todos os fluxos e verificação do estado persistido após cada requisição.
- **Não inclui:** testes de carga ou de segurança.

### Critérios de aceite
- [ ] FP: o evento Planejado completo retorna sucesso, e uma nova leitura mostra o estado `published`.
- [ ] FA01: um identificador inexistente retorna o código aprovado.
- [ ] FA02: um evento já Divulgado retorna o código aprovado e o estado permanece inalterado.
- [ ] FA03: um evento em outro estado retorna o código aprovado e o estado permanece inalterado.
- [ ] FA04: um evento incompleto retorna o código aprovado com os campos ausentes e o estado permanece Planejado.
- [ ] FE01: uma falha no `save` retorna o código aprovado e a falha é informada.
- [ ] `pnpm test:e2e` está aprovado.

### Dependências
SUB-04, SUB-05.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:test`, `layer:api`, `priority:medium`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [SUB-07] Documentar tecnicamente o primeiro slice

**Épico:** [UC03] Divulgar Evento

### Objetivo
Registrar o contrato, as decisões técnicas e a forma de execução do primeiro slice.

### Descrição
- Atualizar o `README.md`: "Tecnologia principal prevista" (NestJS/TypeScript/Vitest, se confirmado) e "Primeiro slice arquitetural" (UC03).
- Documentar o contrato do endpoint (rota, parâmetros, respostas e códigos de erro).
- Registrar as decisões das propostas H01–H05 e das dúvidas D01–D04.
- Garantir que `docs/casos-de-uso.md` esteja versionado e referenciado.

### Origem
Rastreabilidade do UC03; seções "a definir" do README.

### Escopo e responsabilidades
- **Inclui:** README, documentação do endpoint e registro de decisões.
- **Não inclui:** documentação de outros casos de uso.

### Critérios de aceite
- [ ] O README indica a stack e o UC03 como primeiro slice.
- [ ] O contrato do endpoint está documentado e coincide com o comportamento verificado em SUB-06.
- [ ] As decisões H01–H05 e D01–D04 estão registradas com o resultado.
- [ ] `docs/casos-de-uso.md` está presente no repositório.
- [ ] Um membro da equipe diferente do autor revisou a documentação.

### Dependências
SUB-05 (contrato da API). A finalização depende da verificação em SUB-06.

### Labels sugeridas
`module:eventos`, `uc:UC03`, `type:documentation`, `priority:low`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com os arquivos de documentação.
- Aprovação da revisão no PR.
