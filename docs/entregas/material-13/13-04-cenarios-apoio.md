# 13-04 - Cenarios de apoio

Não existe outro recurso de apoio implementado no projeto além dos recursos HTTP do UC03.

## Cenário sem seed

- `PATCH /events/00000000-0000-4000-8000-000000000000/publish` espera `404`.
- O script executou esse cenário e obteve `404`.
- O UUID é um sentinela sintaticamente válido para um registro inexistente, não um identificador de evento real ou fornecido por seed.

## Cenários dependentes de dados

- Divulgação bem-sucedida exige um evento planejado com data, local, orçamento, responsáveis e atividades.
- Cadastro cria evento no estado `planning`, não apropriado à divulgação bem-sucedida.
- Nenhum seed foi usado e nenhum UUID foi fabricado como dado real.
