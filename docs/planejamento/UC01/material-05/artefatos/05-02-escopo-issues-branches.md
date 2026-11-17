# 05-02 — Escopo, issue e branch

## Issue e rastreabilidade

- **Issue principal:** [#26 — UC01/SUB-06](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26)
- **Caso de uso:** `UC01 — Cadastrar Evento`
- **Sub-issue de execução:** `SUB-05 — Expor o cadastro de evento via API HTTP`
- **Rastreabilidade:** teste e2e -> rota HTTP -> serviço -> persistência em memória -> resposta com `eventId`

## Branch atual

```bash
git branch -vv
* test/26-uc01-sub06-event-registration-e2e 99fe329 [origin/test/26-uc01-sub06-event-registration-e2e] feat(events): implement POST /events for green e2e (ref #26)
```

## Escopo do GREEN

Este ciclo cobre apenas o comportamento necessário para o teste RED aprovado:

1. registrar o módulo `EventsModule` no `AppModule`;
2. criar a rota `POST /events`;
3. validar o nome informado;
4. gerar um `eventId` válido;
5. persistir o evento em memória e responder com status HTTP 201;
6. manter o comportamento pré-existente intacto.

## O que foi deliberadamente postergado

- refinamento de persistência real em banco;
- regras adicionais de domínio; 
- refatoração e limpeza arquitetural;
- criação de PR no GitHub, que ficou como item pendente ou a depender da política da equipe.
