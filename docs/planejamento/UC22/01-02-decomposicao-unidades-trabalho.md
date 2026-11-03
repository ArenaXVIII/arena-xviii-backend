# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC22 — Cadastrar Campeonato

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar o Objeto de Valor Período | Representar Período como Objeto de Valor reutilizável, garantindo sua validade no domínio. | Objeto de Valor, validação na construção e testes unitários. | domain | RN-UC22-02, FA02, Seção 5 do modelo conceitual (Objetos de Valor) | — | — | Testes unitários do Objeto de Valor aprovados (`pnpm test`). |
| SUB-02 | Modelar a entidade Campeonato e suas regras | Garantir no domínio as regras do cadastro de campeonato, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC22-01, RN-UC22-02, FP-2, FP-3, FP-4, FA01, FA02 | SUB-01 | — | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-03 | Definir os contratos de aplicação do cadastro de campeonato | Estabelecer os contratos de entrada, saída, persistência e erro do cadastro de campeonato. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-6, FE01 | SUB-02 | — | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-04 | Implementar o serviço de aplicação do cadastro de campeonato | Orquestrar o fluxo principal do cadastro de campeonato na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-5, FP-6, FE01 | SUB-02, SUB-03 | — | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-05 | Implementar o adaptador de persistência de campeonatos | Fornecer implementação concreta da persistência do cadastro de campeonato. | Adaptador de persistência e seus testes. | infra | FP-5 | SUB-02, SUB-03 | — | A decisão H03 foi confirmada pela equipe. |
| SUB-06 | Expor o cadastro de campeonato via API HTTP | Disponibilizar o cadastro de campeonato ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-6, FA01, FA02, FE01 | SUB-04, SUB-05 | UC19 · SUB-05 (criação do `SportsModule`) | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-07 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de campeonato | Verificar o cadastro de campeonato atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FE01, RN-UC22-01, RN-UC22-02, Pós-condições | SUB-06, SUB-05 | — | `pnpm test:e2e` aprovado. |
| SUB-08 | Documentar tecnicamente o cadastro de campeonato | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cadastro de campeonato. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC22, Dúvidas em aberto da especificação | SUB-06, SUB-07 | — | Documentação revisada |

## Justificativa da granularidade

- **8 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
- O Objeto de Valor Período tem unidade própria porque é reutilizado por outros casos de uso.
