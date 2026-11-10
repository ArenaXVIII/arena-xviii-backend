# 05-01 — Diagnóstico RED

## Contexto

A Issue ativa para este ciclo é [#26 — UC01/SUB-06](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26), vinculada ao caso de uso `UC01 — Cadastrar Evento`.

O teste RED já havia sido escrito em `test/events.e2e-spec.ts` para validar a criação de evento via `POST /events`.

## Evidência executada

Comando executado:

```bash
npm run test:e2e -- --run test/events.e2e-spec.ts
```

Saída observada:

```text
 FAIL  test/events.e2e-spec.ts > Events API (e2e) > creates an event and returns its identifier for a valid name
Error: expected 201 "Created", got 404 "Not Found"
```

## Diagnóstico

A falha é funcional e não é um problema de sintaxe do teste: a API não expõe a rota `POST /events` ou não trata a criação do evento no módulo correspondente. O problema principal é a ausência de rota e do fluxo de criação no módulo de eventos.

## Conclusão

O estado RED está confirmado: o endpoint de cadastro não existe na aplicação, então a implementação GREEN precisa registrar o módulo de eventos, a rota `POST /events` e o fluxo mínimo de criação com retorno do `eventId`.
