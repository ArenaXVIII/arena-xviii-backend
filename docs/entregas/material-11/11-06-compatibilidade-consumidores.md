# 11-06 - Compatibilidade com consumidores

## Contrato atual

Cadastro:

- `eventId: string`
- `status: string`
- `createdAt: string`
- `message: string`
- Status 201

Divulgacao:

- `eventId: string`
- `status: string`
- `updatedAt: string`
- `message: string`
- Status 200

## Matriz de mudancas hipoteticas

| Mudanca | Classificacao | Impacto e mitigacao |
|---|---|---|
| Renomear `eventId` | Potencialmente incompativel | Quebra clientes que leem o identificador; manter nome e introduzir alias somente com planejamento de versao |
| Renomear `status` | Potencialmente incompativel | Quebra binding fechado e persistencia local; usar novo campo opcional antes de remover o antigo |
| Remover `createdAt` ou `updatedAt` | Potencialmente incompativel | Quebra consumidores que usam timestamps; preservar por ciclo de depreciacao |
| Alterar identificador string para numero | Potencialmente incompativel | Quebra UUIDs e validacoes; nao implementar |
| Encapsular resposta em `data` | Potencialmente incompativel | Quebra desestruturação direta e clientes fechados; manter top-level |
| Alterar sucesso de 201 para 200 | Potencialmente incompativel | Quebra clientes que verificam semantica de criacao; preservar 201 |
| Adicionar propriedade opcional | Potencialmente compativel ou dependente | Pode quebrar validadores fechados; documentar e testar antes |

Nenhuma dessas alteracoes foi implementada e nao foi criada uma API v2.

## Verificacao pos-atividade

- Os campos atuais foram preservados.
- Os status 201, 400 e 422 foram preservados conforme o projeto.
- Nenhuma mudanca breaking foi implementada.
