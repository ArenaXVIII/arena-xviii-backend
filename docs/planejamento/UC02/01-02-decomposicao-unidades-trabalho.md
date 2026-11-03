# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC02 — Definir Planejamento do Evento

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar o Objeto de Valor Valor Monetário | Representar Valor Monetário como Objeto de Valor reutilizável, garantindo sua validade no domínio. | Objeto de Valor, validação na construção e testes unitários. | domain | Seção 5 do modelo conceitual (Objetos de Valor) | — | — | Testes unitários do Objeto de Valor aprovados (`pnpm test`). |
| SUB-02 | Implementar no domínio a operação de definição de planejamento de evento | Garantir no domínio as regras da definição de planejamento do evento, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC02-01, RN-UC02-02, RN-UC02-03, RN-UC02-04, FP-3, FP-4, FP-5, FA02, FA03, FA04 | SUB-01 | #13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`) | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-03 | Definir os contratos de aplicação da definição de planejamento do evento | Estabelecer os contratos de entrada, saída, persistência e erro da definição de planejamento do evento. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-2, FP-7, FA01, FE01 | SUB-02 | #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01) | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-04 | Implementar o serviço de aplicação da definição de planejamento do evento | Orquestrar o fluxo principal da definição de planejamento do evento na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-2, FP-6, FP-7, FA01, FE01, RN-UC02-05 | SUB-02, SUB-03 | #15 (UC03 · SUB-03 — `EventsService`) | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-05 | Expor a definição de planejamento via API HTTP | Disponibilizar a definição de planejamento ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-7, FA01, FA02, FA03, FA04, FE01 | SUB-04 | #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) da definição de planejamento do evento | Verificar a definição de planejamento atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FA03, FA04, FE01, RN-UC02-01, RN-UC02-02, RN-UC02-03, RN-UC02-04, RN-UC02-05, Pós-condições | SUB-05 | #16 (UC03 · SUB-04 — adaptador de persistência de eventos) | `pnpm test:e2e` aprovado. |
| SUB-07 | Documentar tecnicamente a definição de planejamento | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da definição de planejamento do evento. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC02, Dúvidas em aberto da especificação | SUB-05, SUB-06 | — | Documentação revisada |

## Justificativa da granularidade

- **7 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
- Não há unidade de persistência: o caso de uso reutiliza o adaptador de eventos do UC03 (#16), sem necessidade de novas operações de repositório.
- O Objeto de Valor Valor Monetário tem unidade própria porque é reutilizado por outros casos de uso.
