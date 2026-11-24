# 12-06 - Verificacao de regressoes

## Linha de base desta auditoria

- `pnpm build`: aprovado.
- `pnpm lint`: aprovado, 0 erros.
- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado.

## Comandos executados

```bash
pnpm build
pnpm lint
pnpm test
docker compose up -d postgres-test
pnpm test:integration
docker compose ps
docker compose run --rm --no-deps api pnpm migration:show:prod
```

## Ambiente seguro

- Banco de testes ativo na porta publicada 5434.
- Projeto Compose confirmado como `arena-xviii-backend`.
- Nenhum volume foi removido.
- Nenhuma migration foi revertida ou recriada.
- Nenhum teste destrutivo foi executado.

## HTTP containerizado

- Cadastro valido com campo extra: 201.
- Nome com espacos: 422.
- Corpo vazio: 400.
- Content-Type das respostas: `application/json; charset=utf-8`.
- Resposta valida continha apenas os campos publicos.

## Testes nao executados

Os testes E2E nao foram executados. Os arquivos analisados importam `AppModule` completo e o ambiente pode apontar para o banco de desenvolvimento.

## Regressao

Nenhuma regressao foi observada nas suites executadas. Como nao houve alteracao de codigo, o resultado conserva a linha de base.

## Limitacoes

A auditoria nao valida a totalidade dos caminhos E2E nem garante ausencia absoluta de defeitos.

## Evidencias reais da verificacao pos-atividade

- `pnpm build`: aprovado.
- `pnpm lint`: aprovado sem erros.
- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado.
- API, PostgreSQL desenvolvimento e banco de testes: confirmados em `docker compose ps`.
- Banco de testes: projeto Compose `arena-xviii-backend`, service `postgres-test`, porta publicada 5434.
- HTTP containerizado:
  - campo extra com cadastro valido: 201;
  - nome com espacos: 422;
  - corpo vazio e tipo incorreto: 400.
- SQL confirmou o UUID criado nesta verificacao no banco de desenvolvimento.
- Migration: `[X] 1 CreateEventsTable1794873600000`.
- Nao houve alteracao do lockfile e nenhuma credencial foi registrada.

## Seguranca E2E

Os testes E2E continuam nao executados. `events.e2e-spec.ts` e `app.e2e-spec.ts` importam `AppModule`, que usa a configuracao do banco de desenvolvimento fora de `NODE_ENV=test`. O isolamento nao foi confirmado, portanto o risco permanece documentado.
