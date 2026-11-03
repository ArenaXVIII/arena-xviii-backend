# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC23 — Inscrever Equipe em Campeonato

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar a entidade Participação em Campeonato e suas regras | Garantir no domínio as regras da inscrição de equipe em campeonato, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC23-01, RN-UC23-03, FP-5 | — | — | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-02 | Definir os contratos de aplicação da inscrição de equipe em campeonato | Estabelecer os contratos de entrada, saída, persistência e erro da inscrição de equipe em campeonato. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-2, FP-3, FP-4, FP-7, FA01, FA02, FA03, FE01 | SUB-01 | — | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-03 | Implementar o serviço de aplicação da inscrição de equipe em campeonato | Orquestrar o fluxo principal da inscrição de equipe em campeonato na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-2, FP-3, FP-4, FP-6, FP-7, FA01, FA02, FA03, FE01, RN-UC23-01, RN-UC23-02 | SUB-01, SUB-02 | UC20 · SUB-02 (porta de repositório de equipe); UC22 · SUB-03 (porta de repositório de campeonato) | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-04 | Implementar o adaptador de persistência de participações | Fornecer implementação concreta da persistência da inscrição de equipe em campeonato. | Adaptador de persistência e seus testes. | infra | FP-2, FP-3, FP-4, FP-6, FA03, RN-UC23-02 | SUB-01, SUB-02 | — | A decisão H03 foi confirmada pela equipe. |
| SUB-05 | Expor a inscrição de equipe em campeonato via API HTTP | Disponibilizar a inscrição de equipe em campeonato ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-7, FA01, FA02, FA03, FE01 | SUB-03, SUB-04 | UC19 · SUB-05 (criação do `SportsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) da inscrição de equipe em campeonato | Verificar a inscrição de equipe em campeonato atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FA03, FE01, RN-UC23-01, RN-UC23-02, RN-UC23-03, Pós-condições | SUB-05, SUB-04 | UC20 · SUB-04 (adaptador de persistência de equipe); UC22 · SUB-05 (adaptador de persistência de campeonato) | `pnpm test:e2e` aprovado. |
| SUB-07 | Documentar tecnicamente a inscrição de equipe em campeonato | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da inscrição de equipe em campeonato. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC23, Dúvidas em aberto da especificação | SUB-05, SUB-06 | — | Documentação revisada |

## Justificativa da granularidade

- **7 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
