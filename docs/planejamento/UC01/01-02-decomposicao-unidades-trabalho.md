# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC01 — Cadastrar Evento

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Implementar no domínio a criação de evento | Garantir no domínio as regras do cadastro de evento, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC01-01, RN-UC01-02, FP-2, FP-3, FA01 | — | #13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`) | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-02 | Definir os contratos de aplicação do cadastro de evento | Estabelecer os contratos de entrada, saída, persistência e erro do cadastro de evento. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-5, FE01 | SUB-01 | #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01) | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-03 | Implementar o serviço de aplicação do cadastro de evento | Orquestrar o fluxo principal do cadastro de evento na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-4, FP-5, FE01, RN-UC01-03 | SUB-01, SUB-02 | — | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-04 | Estender o adaptador de persistência de eventos para o cadastro | Fornecer implementação concreta da persistência do cadastro de evento. | Adaptador de persistência e seus testes. | infra | FP-4, RN-UC01-03 | SUB-01, SUB-02 | #16 (UC03 · SUB-04 — adaptador de persistência de eventos) | Testes do adaptador aprovados. |
| SUB-05 | Expor o cadastro de evento via API HTTP | Disponibilizar o cadastro de evento ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-5, FA01, FE01 | SUB-03, SUB-04 | #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento | Verificar o cadastro de evento atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FE01, RN-UC01-01, RN-UC01-02, RN-UC01-03, Pós-condições | SUB-05, SUB-04 | — | `pnpm test:e2e` aprovado. |
| SUB-07 | Documentar tecnicamente o cadastro de evento | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cadastro de evento. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC01, Dúvidas em aberto da especificação | SUB-05, SUB-06 | — | Documentação revisada |

## Justificativa da granularidade

- **7 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
