# 09-03 - Configuracao do TypeORM

## Dependencias e configuracoes

Foram adicionados `@nestjs/typeorm`, `typeorm`, `pg` e `dotenv`. A versao resolvida pelo lockfile para TypeORM e 1.1.3; `pnpm-lock.yaml` foi atualizado pelo `pnpm add`.

`AppModule` configura `TypeOrmModule.forRootAsync` para PostgreSQL, le as variaveis `DB_*`, habilita `autoLoadEntities`, mantem `synchronize: false` e nao executa migrations na inicializacao (`migrationsRun: false`). As migrations sao executadas manualmente pelo comando dedicado.

`src/database/data-source.ts` exporta o DataSource da CLI, carrega `.env`, registra `EventOrmEntity`, a migration real e a tabela de historico `migrations`; tambem mantem `synchronize: false`. Os imports relativos usam extensao `.js`, conforme o projeto ESM/NodeNext.

Em `NODE_ENV=test`, `AppModule` e `EventsModule` nao abrem conexao PostgreSQL e preservam o provider em memoria. Isso mantem os testes unitarios, HTTP e integrados em memoria sem banco ativo. O teste PostgreSQL e separado por `vitest.config.postgres.ts` e cria seu DataSource usando exclusivamente as variaveis `TEST_DB_*`.

## Scripts

- `pnpm migration:show`: compila e consulta o historico/configuracao, sem aplicar migration.
- `pnpm migration:run`: compila e aplica migrations ao banco indicado por `DB_*`.
- `pnpm test:integration`: executa apenas `test/**/*.postgres.integration.test.ts`.

Esses scripts foram adicionados, mas os comandos de migration nao foram executados porque nao havia PostgreSQL disponivel para confirmar o destino e o historico real.

## Evidencias e pendencias

`pnpm build` passou, `pnpm exec tsc --noEmit` passou e `pnpm test --run` passou com 11 testes durante a validacao da configuracao. A verificacao posterior do adapter tambem passou com tres testes direcionados.

Nao foi possivel consultar `current_database()`, `current_user`, schema existente ou historico de migrations; o Docker Desktop nao estava ativo e nao havia `.env` local. Nenhuma migration foi aplicada. Antes de usar `pnpm migration:run`, preencher configuracao local, verificar o banco alvo e inspecionar tabela e historico existentes.
