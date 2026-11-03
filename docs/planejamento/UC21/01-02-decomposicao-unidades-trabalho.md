# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC21 — Registrar Treino

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar a entidade Treino e suas regras | Garantir no domínio as regras do registro de treino, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC21-01, RN-UC21-02, FP-3, FP-4, FA02 | — | — | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-02 | Definir os contratos de aplicação do registro de treino | Estabelecer os contratos de entrada, saída, persistência e erro do registro de treino. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-2, FP-6, FA01, FE01 | SUB-01 | — | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-03 | Implementar o serviço de aplicação do registro de treino | Orquestrar o fluxo principal do registro de treino na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-2, FP-5, FP-6, FA01, FE01, RN-UC21-01 | SUB-01, SUB-02 | UC20 · SUB-02 (porta de repositório de equipe) | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-04 | Implementar o adaptador de persistência de treinos | Fornecer implementação concreta da persistência do registro de treino. | Adaptador de persistência e seus testes. | infra | FP-2, FP-5 | SUB-01, SUB-02 | — | A decisão H03 foi confirmada pela equipe. |
| SUB-05 | Expor o registro de treino via API HTTP | Disponibilizar o registro de treino ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-6, FA01, FA02, FE01 | SUB-03, SUB-04 | UC19 · SUB-05 (criação do `SportsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do registro de treino | Verificar o registro de treino atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FE01, RN-UC21-01, RN-UC21-02, Pós-condições | SUB-05, SUB-04 | UC20 · SUB-04 (adaptador de persistência de equipe) | `pnpm test:e2e` aprovado. |
| SUB-07 | Documentar tecnicamente o registro de treino | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do registro de treino. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC21, Dúvidas em aberto da especificação | SUB-05, SUB-06 | — | Documentação revisada |

## Justificativa da granularidade

- **7 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
