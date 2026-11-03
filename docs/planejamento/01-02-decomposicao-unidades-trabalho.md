# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC03 — Divulgar Evento

Cada unidade inclui seus próprios testes automatizados. As fases RED/GREEN/REFACTOR acontecem **dentro** de cada unidade e não foram separadas em tarefas distintas.

> **Observação sobre o código preexistente:** SUB-01, SUB-02 e SUB-03 têm código inicial no repositório. Nessas unidades, o trabalho consiste em **revisar, completar e validar** esse código contra os critérios de aceite. O código preexistente não é considerado concluído.

## Tabela de unidades de trabalho

| ID | Atividade técnica | Objetivo | Escopo e responsabilidades | Componente / camada | Requisito / regra de origem | Dependências | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar a entidade Evento e a transição de divulgação | Garantir no domínio a transição Planejado → Divulgado protegida pela RN01 | Enum `EventStatus`; entidade `Event` com método `publish()`; verificação dos campos da RN01; exceções de domínio de FA02, FA03 e FA04 (com campos ausentes); testes unitários da entidade | Domínio | RN01, RN-UC03-01, RN-UC03-02, FA02, FA03, FA04, FP-3, FP-4, FP-5 | — | Entidade aplica as regras na ordem documentada, com testes unitários da entidade aprovados |
| SUB-02 | Definir os contratos de aplicação (porta de repositório e DTO de resposta) | Estabelecer os contratos entre aplicação, infraestrutura e interface | Interface `IEventsRepository` e token `EVENTS_REPOSITORY`; `PublishEventResponseDto`; exceções de aplicação de FA01 e FE01 | Aplicação (contratos) | FP-2, FP-6, FP-7, FA01, FE01 | SUB-01 | Contratos estáveis, tipados e revisados, prontos para consumo por SUB-03, SUB-04 e SUB-05 |
| SUB-03 | Implementar o serviço de aplicação de divulgação | Orquestrar o fluxo principal do UC03 | `EventsService.publishEvent`: localizar, delegar a `publish()`, persistir, montar a resposta, tratar FA01 e FE01, não chamar `save` em rejeições; testes unitários com repositório simulado | Aplicação | FP-1 a FP-7, FA01–FA04, FE01, RN-UC03-03 | SUB-01, SUB-02 | Todos os fluxos cobertos por testes unitários do serviço, incluindo FE01 |
| SUB-04 | Implementar o adaptador de persistência de eventos | Fornecer uma implementação concreta da porta de repositório | Classe que implementa `IEventsRepository` (proposta H03: em memória); persistência atômica do estado; testes do adaptador | Infraestrutura | FP-2, FP-6, RN-UC03-03, pós-condições | SUB-01, SUB-02 | Adaptador aprovado nos testes de localizar e salvar; o estado persistido não muda quando a operação falha |
| SUB-05 | Expor a divulgação via API HTTP e registrar o módulo de eventos | Disponibilizar o UC03 ao ator por uma interface externa | `EventsController` (proposta H01); mapeamento das exceções para respostas HTTP (proposta H02); `EventsModule` com provedores; registro no `AppModule` | Interface (API) | FP-1, FP-7, FA01–FA04 (mensagens ao ator), FE01 (falha informada) | SUB-03, SUB-04 | Endpoint funcional no ambiente local, com respostas padronizadas para sucesso e para cada rejeição |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do slice | Verificar o UC03 atravessando todas as camadas | Testes com Supertest para FP, FA01, FA02, FA03, FA04 e FE01; verificação das pós-condições (estado persistido) | Testes (e2e) | Todos os fluxos; pós-condições de sucesso e de falha | SUB-04, SUB-05 | Suíte `pnpm test:e2e` aprovada, cobrindo todos os fluxos documentados |
| SUB-07 | Documentar tecnicamente o primeiro slice | Registrar o contrato, as decisões e a forma de execução do slice | Atualizar o README (stack e primeiro slice); documentar o contrato do endpoint e os códigos de erro; registrar as decisões H01–H05 e as dúvidas D01–D04 | Documentação | Rastreabilidade do UC03; seção "Primeiro slice arquitetural" do README | SUB-05 (contrato); finalização após SUB-06 | Documentação revisada e coerente com o comportamento verificado |

## Justificativa da granularidade

- **7 unidades**, cada uma delimitada por camada ou responsabilidade, com entregável verificável de forma independente.
- SUB-02 foi separada de SUB-03 porque os contratos são consumidos por três unidades (SUB-03, SUB-04 e SUB-05). Fixá-los antes reduz retrabalho e permite trabalho paralelo.
- Os testes unitários ficam dentro das unidades de domínio, aplicação e infraestrutura. Apenas os testes **e2e** formam uma unidade própria (SUB-06), porque atravessam várias camadas e dependem de todas elas, e não por serem uma "fase RED".
