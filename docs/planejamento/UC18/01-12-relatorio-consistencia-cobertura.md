# Artefato 12 — Relatório de Consistência e Cobertura

**Caso de uso:** UC18 — Vincular Associado a Modalidade

## 1. Quantitativo

| Item | Quantidade |
|---|---|
| Epic | 1 |
| Sub-Issues | 7 |
| Total de Issues | 8 |

## 2. Cobertura

| Elemento | Total | Cobertos |
|---|---|---|
| Passos do fluxo principal | 7 | 7 |
| Fluxos alternativos e de exceção | 4 | 4 |
| Regras de negócio | 3 | 3 |
| Pré e pós-condições | 3 | 3 |

## 3. Dependências críticas

- Caminho crítico interno: SUB-01 → SUB-02 → SUB-03 → SUB-05 → SUB-06 → SUB-07.
- Casos de uso pré-requisito: UC17, UC19.

## 4. Decisões que dependem de validação da equipe

| ID | Decisão |
|---|---|
| H01 | Rota HTTP `POST /members/:memberId/modalities` |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 404, FA03 → 409, FE01 → 500 |
| H03 | Adaptador de persistência inicial em memória |
| H04 | Nomes de classes/arquivos em inglês (`MemberModality`, `linkMemberToModality`), seguindo o padrão do código existente |
| H05 | Sem autenticação/autorização nesta etapa |
| RN-UC18-02 | Um associado não pode ser vinculado duas vezes à mesma modalidade |
| RN-UC18-03 | Um associado pode participar de mais de uma modalidade |
| D01–D03 | Dúvidas em aberto da especificação (Artefato 1, seção 11.3) |

## 5. Riscos e recomendações

| Risco | Impacto | Recomendação |
|---|---|---|
| Especificação em Rascunho | Retrabalho se regras mudarem após o início | Validar a especificação antes de mover itens para `Ready` |
| Regras marcadas como proposta técnica | Critérios de aceite podem mudar | Decidir e registrar no épico antes da implementação do domínio |
| Conceito não modelado | Decomposição pode mudar substancialmente | Confirmar a cardinalidade Associado–Modalidade e se Atleta é papel do Associado ou Entidade própria antes de iniciar a implementação. |
| Dependência de outros casos de uso | Bloqueio do caminho crítico | Implementar primeiro: UC17, UC19 |
| Persistência em memória | Falhas reais de persistência verificadas apenas com dublês | Registrar a troca por banco real como evolução |

**Recomendação para o início:** validar a especificação e decidir as propostas técnicas; em seguida, mover SUB-01 para `Ready`.
