# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC04 — Iniciar Vendas/Inscrições

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Implementar no domínio a operação de início de vendas/inscrições | Garantir no domínio as regras do início de vendas/inscrições, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC04-01, FP-3, FP-4, FA02 | — | #13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`) | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-02 | Definir os contratos de aplicação do início de vendas/inscrições | Estabelecer os contratos de entrada, saída, persistência e erro do início de vendas/inscrições. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-2, FP-6, FA01, FE01 | SUB-01 | #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01) | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-03 | Implementar o serviço de aplicação do início de vendas/inscrições | Orquestrar o fluxo principal do início de vendas/inscrições na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-2, FP-5, FP-6, FA01, FE01, RN-UC04-02 | SUB-01, SUB-02 | #15 (UC03 · SUB-03 — `EventsService`) | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-04 | Expor o início de vendas/inscrições via API HTTP | Disponibilizar o início de vendas/inscrições ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-6, FA01, FA02, FE01 | SUB-03 | #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-05 | Implementar os testes de integração ponta a ponta (e2e) do início de vendas/inscrições | Verificar o início de vendas/inscrições atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FE01, RN-UC04-01, RN-UC04-02, Pós-condições | SUB-04 | #16 (UC03 · SUB-04 — adaptador de persistência de eventos) | `pnpm test:e2e` aprovado. |
| SUB-06 | Documentar tecnicamente o início de vendas/inscrições | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do início de vendas/inscrições. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC04, Dúvidas em aberto da especificação | SUB-04, SUB-05 | — | Documentação revisada |

## Justificativa da granularidade

- **6 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
- Não há unidade de persistência: o caso de uso reutiliza o adaptador de eventos do UC03 (#16), sem necessidade de novas operações de repositório.
