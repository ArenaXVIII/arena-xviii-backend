# Artefato 2 — Decomposição em Unidades de Trabalho

**Caso de uso:** UC24 — Cadastrar Material

Cada unidade inclui seus próprios testes automatizados; as fases RED/GREEN/REFACTOR ocorrem dentro de cada unidade e não foram separadas em tarefas.

| ID | Atividade técnica | Objetivo | Escopo | Camada | Origem no caso de uso | Dependências internas | Dependências externas | Critério geral de conclusão |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar o Objeto de Valor Quantidade | Representar Quantidade como Objeto de Valor reutilizável, garantindo sua validade no domínio. | Objeto de Valor, validação na construção e testes unitários. | domain | RN-UC24-02, FA02, Seção 5 do modelo conceitual (Objetos de Valor) | — | — | Testes unitários do Objeto de Valor aprovados (`pnpm test`). |
| SUB-02 | Modelar a entidade Material e suas regras | Garantir no domínio as regras do cadastro de material, independentemente da camada de entrada. | Entidade/operação de domínio, exceções de domínio e testes unitários. | domain | RN-UC24-01, RN-UC24-02, RN-UC24-03, FP-2, FP-3, FP-4, FA01, FA02 | SUB-01 | — | Testes unitários do domínio aprovados (`pnpm test`). |
| SUB-03 | Definir os contratos de aplicação do cadastro de material | Estabelecer os contratos de entrada, saída, persistência e erro do cadastro de material. | DTOs, porta de repositório e exceções de aplicação. | application | FP-1, FP-6, FE01 | SUB-02 | — | O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`). |
| SUB-04 | Implementar o serviço de aplicação do cadastro de material | Orquestrar o fluxo principal do cadastro de material na camada de aplicação. | Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários. | application | FP-5, FP-6, FE01 | SUB-02, SUB-03 | — | Testes unitários do serviço com repositórios simulados aprovados. |
| SUB-05 | Implementar o adaptador de persistência de materiais | Fornecer implementação concreta da persistência do cadastro de material. | Adaptador de persistência e seus testes. | infra | FP-5 | SUB-02, SUB-03 | — | A decisão H03 foi confirmada pela equipe. |
| SUB-06 | Expor o cadastro de material via API HTTP | Disponibilizar o cadastro de material ao ator por meio da API HTTP. | Rota, mapeamento de erros e registro de módulo. | api | FP-1, FP-6, FA01, FA02, FE01 | SUB-04, SUB-05 | — | O controller não contém regra de negócio; apenas delega ao serviço. |
| SUB-07 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de material | Verificar o cadastro de material atravessando todas as camadas. | Cenários e2e de todos os fluxos. | api | FP completo, FA01, FA02, FE01, RN-UC24-01, RN-UC24-02, RN-UC24-03, Pós-condições | SUB-06, SUB-05 | — | `pnpm test:e2e` aprovado. |
| SUB-08 | Documentar tecnicamente o cadastro de material | Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cadastro de material. | Documentação técnica e registro de decisões. | docs | Rastreabilidade do UC24, Dúvidas em aberto da especificação | SUB-06, SUB-07 | — | Documentação revisada |

## Justificativa da granularidade

- **8 unidades**, delimitadas por camada e responsabilidade, cada uma com entregável verificável de forma independente.
- Os contratos são separados do serviço porque são consumidos pelo serviço, pelo adaptador e pelo controller.
- Os testes unitários ficam dentro de cada unidade; apenas os testes e2e formam unidade própria, por dependerem de todas as camadas.
- O Objeto de Valor Quantidade tem unidade própria porque é reutilizado por outros casos de uso.
