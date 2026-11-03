# Artefato 12 — Relatório de Consistência e Cobertura

**Caso de uso:** UC01 — Cadastrar Evento

## 1. Quantitativo

| Item | Quantidade |
|---|---|
| Epic | 1 |
| Sub-Issues | 7 |
| Total de Issues | 8 |

## 2. Cobertura

| Elemento | Total | Cobertos |
|---|---|---|
| Passos do fluxo principal | 5 | 5 |
| Fluxos alternativos e de exceção | 2 | 2 |
| Regras de negócio | 3 | 3 |
| Pré e pós-condições | 3 | 3 |

## 3. Dependências críticas

- Caminho crítico interno: SUB-01 → SUB-02 → SUB-03 → SUB-05 → SUB-06 → SUB-07.
- Casos de uso pré-requisito: nenhum.
- Infraestrutura do módulo de Eventos: Issues #13 a #17 (UC03).

## 4. Decisões que dependem de validação da equipe

| ID | Decisão |
|---|---|
| H01 | Rota HTTP `POST /events` |
| H02 | Códigos HTTP: FA01 → 422, FE01 → 500 |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `createEvent`), seguindo o padrão do código existente |
| H04 | Sem autenticação/autorização nesta etapa |
| RN-UC01-02 | O evento deve possuir um nome não vazio |
| D01–D02 | Dúvidas em aberto da especificação (Artefato 1, seção 11.3) |

## 5. Riscos e recomendações

| Risco | Impacto | Recomendação |
|---|---|---|
| Especificação em Rascunho | Retrabalho se regras mudarem após o início | Validar a especificação antes de mover itens para `Ready` |
| Regras marcadas como proposta técnica | Critérios de aceite podem mudar | Decidir e registrar no épico antes da implementação do domínio |

**Recomendação para o início:** validar a especificação e decidir as propostas técnicas; em seguida, mover SUB-01 para `Ready`.
