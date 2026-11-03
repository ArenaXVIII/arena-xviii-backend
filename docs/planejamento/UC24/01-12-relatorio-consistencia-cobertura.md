# Artefato 12 — Relatório de Consistência e Cobertura

**Caso de uso:** UC24 — Cadastrar Material

## 1. Quantitativo

| Item | Quantidade |
|---|---|
| Epic | 1 |
| Sub-Issues | 8 |
| Total de Issues | 9 |

## 2. Cobertura

| Elemento | Total | Cobertos |
|---|---|---|
| Passos do fluxo principal | 6 | 6 |
| Fluxos alternativos e de exceção | 3 | 3 |
| Regras de negócio | 3 | 3 |
| Pré e pós-condições | 3 | 3 |

## 3. Dependências críticas

- Caminho crítico interno: SUB-01 → SUB-02 → SUB-03 → SUB-04 → SUB-06 → SUB-07 → SUB-08.
- Casos de uso pré-requisito: nenhum.

## 4. Decisões que dependem de validação da equipe

| ID | Decisão |
|---|---|
| H01 | Rota HTTP `POST /materials` |
| H02 | Códigos HTTP: FA01 → 422, FA02 → 422, FE01 → 500 |
| H03 | Adaptador de persistência inicial em memória |
| H04 | Critério de validade de Quantidade (Objeto de Valor `Quantity`, ver SUB-01) |
| H05 | Nomes de classes/arquivos em inglês (`Material`, `createMaterial`), seguindo o padrão do código existente |
| H06 | Sem autenticação/autorização nesta etapa |
| RN-UC24-01 | O material deve possuir um nome não vazio |
| RN-UC24-02 | A quantidade do material não pode ser negativa |
| RN-UC24-03 | O material é controlado por quantidade |
| D01–D02 | Dúvidas em aberto da especificação (Artefato 1, seção 11.3) |

## 5. Riscos e recomendações

| Risco | Impacto | Recomendação |
|---|---|---|
| Especificação em Rascunho | Retrabalho se regras mudarem após o início | Validar a especificação antes de mover itens para `Ready` |
| Regras marcadas como proposta técnica | Critérios de aceite podem mudar | Decidir e registrar no épico antes da implementação do domínio |
| Persistência em memória | Falhas reais de persistência verificadas apenas com dublês | Registrar a troca por banco real como evolução |

**Recomendação para o início:** validar a especificação e decidir as propostas técnicas; em seguida, mover SUB-01 para `Ready`.
