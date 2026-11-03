# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC06 — Confirmar Inscrição em Evento

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Implementar no domínio a operação de confirmação de inscrição | Garantir no domínio as regras da confirmação de inscrição, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN02, RN-UC06-01, FP-3, FP-4, FP-5, FP-6, FA02, FA03, FA04 | — | UC05 · SUB-01 (entidade de inscrições) | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-02 | Definir os contratos de aplicação da confirmação de inscrição | Estabelecer os contratos de entrada, saída, persistência e erro da confirmação de inscrição. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-2, FP-8, FA01, FE01 | SUB-01 | UC05 · SUB-02 (porta de repositório de inscrições) | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-03 | Definir a porta de consulta de pagamento da inscrição | Permitir que a confirmação verifique se o pagamento obrigatório da inscrição foi realizado (RN02), sem acoplar o módulo de Eventos ao módulo Financeiro. | Conforme descrição. | application | RN02, FP-5, FA04 | SUB-02 | UC12 · SUB-02 (porta de repositório de pagamentos); UC12 · SUB-04 (adaptador de persistência de pagamentos) | Testes unitários do adaptador aprovados. |
| SUB-04 | Implementar o serviço de aplicação da confirmação de inscrição | Orquestrar o fluxo principal da confirmação de inscrição na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-2, FP-5, FP-7, FP-8, FA01, FA04, FE01, RN-UC06-02 | SUB-01, SUB-02, SUB-03 | — | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-05 | Expor a confirmação de inscrição via API HTTP | Disponibilizar a confirmação de inscrição ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-8, FA01, FA02, FA03, FA04, FE01 | SUB-04 | UC05 · SUB-05 (rotas de inscrições) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) da confirmação de inscrição | Verificar a confirmação de inscrição atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FA03, FA04, FE01, RN02, RN-UC06-01, RN-UC06-02, Pós-condições | SUB-05 | UC05 · SUB-04 (adaptador de persistência de inscrições) | `pnpm test:e2e` aprovado. |
| SUB-07 | Documentar tecnicamente a confirmação de inscrição | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da confirmação de inscrição. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC06, Dúvidas em aberto da especificação | SUB-05, SUB-06 | — | Documentação revisada |

## Justificativa da granularidade

- **7 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
- Não há unidade de persistência: o caso de uso reutiliza o adaptador de eventos do UC03 (#16), sem necessidade de novas operações de repositório.
- "Definir a porta de consulta de pagamento da inscrição" tem unidade própria por concentrar uma responsabilidade distinta (RN02, FP-5, FA04).
