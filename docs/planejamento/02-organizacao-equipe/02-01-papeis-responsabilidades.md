# 02-01 - Matriz de Papéis e Responsabilidades

## 1. Fonte e contexto

- Caso de uso herdado: **UC03 — Divulgar Evento**.
- Equipe registrada no projeto: **Adriel Ostrovski**, **Bolivar Torres Neto** e **Luna Ribeiro**.
- O planejamento anterior já registra **@LunaRibeiro** como responsável principal do épico e das Sub-Issues do slice.
- Não há evidência documental de permissões administrativas reais no GitHub para nenhum membro; portanto, os papéis abaixo são funcionais e de governança operacional, e não substituem a autorização formal do administrador do repositório.

## 2. Matriz funcional

| Integrante | GitHub | Papel principal | Papel secundário | Responsabilidades principais | Justificativa técnica |
|---|---|---|---|---|---|
| Adriel Ostrovski | A definir (não documentado no planejamento anterior) | Desenvolvedor | Revisor de Issues | Apoio em infraestrutura, validação de critérios de aceite, revisão cruzada e suporte de integração/HTTP | Excelente complementar para revisar regras de domínio, contratos e testes, reduzindo risco de regressões na transição Planejado → Divulgado |
| Bolivar Torres Neto | A definir (não documentado no planejamento anterior) | Desenvolvedor | Revisor de Issues | Apoio em persistência, testes de integração e documentação do slice | Permite separar execução e revisão, especialmente para SUB-04, SUB-06 e SUB-07 |
| Luna Ribeiro | @LunaRibeiro | Coordenador do slice / responsável técnico | Desenvolvedora principal | Supervisão do epic, alinhamento técnico, governança de dependências e fechamento da implementação das Sub-Issues do UC03 | A documentação anterior já a indica como responsável do slice e como proprietária da regra de negócio e arquitetura inicial |

## 3. Distribuição funcional recomendada

### Coordenador do trabalho
- **Luna Ribeiro**
- Responsável por: acompanhamento de dependências, sincronização entre desenvolvimento e revisão, comunicação interna da equipe e acompanhamento de prazo do slice.

### Responsável técnico / arquitetura
- **Luna Ribeiro**
- Responsável por: definição de contratos, estabilidade do módulo de eventos, decisões de arquitetura e alinhamento com a regra RN01.

### Desenvolvedores
- **Luna Ribeiro**: domínio, contratos e orquestração do UC03.
- **Adriel Ostrovski**: apoio em API e revisão cruzada das implementações.
- **Bolivar Torres Neto**: apoio em persistência, testes e documentação.

### Revisores de planejamento e requisitos
- **Adriel Ostrovski** e **Bolivar Torres Neto** revisam as entregas da equipe, com foco em critérios de aceite e rastreabilidade.
- A revisão deve ser **independente da implementação**; o revisor não deve ser o mesmo responsável pela Sub-Issue.

## 4. Observações de governança

- A atribuição de papéis é funcional e **não implica** em acesso administrativo ao repositório.
- A permissão de `Admin` deve ser aplicada **somente** quando houver necessidade operacional explícita e com aprovação do responsável do repositório.
- Para o slice atual, a recomendação é manter o GitHub em nível de `Write` para os integrantes de desenvolvimento, com revisão cruzada por pares e aprovação por um revisor formal.

> **Decisão da equipe:** a composição funcional acima é baseada no planejamento existente e foi proposta para distribuir execução e revisão sem alterar os requisitos do caso de uso.
