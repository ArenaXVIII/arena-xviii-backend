# 09-03 - Configuracao do TypeORM

## Dependencias e configuracoes

Foram adicionados `@nestjs/typeorm`, `typeorm`, `pg` e `dotenv`. A versao resolvida pelo lockfile para TypeORM e 1.1.3; `pnpm-lock.yaml` foi atualizado pelo `pnpm add`.

`AppModule` configura `TypeOrmModule.forRootAsync` para PostgreSQL, le as variaveis `DB_*`, habilita `autoLoadEntities`, mantem `synchronize: false` e nao executa migrations na inicializacao (`migrationsRun: false`). As migrations sao executadas manualmente pelo comando dedicado.

`src/database/data-source.ts` exporta o DataSource da CLI, carrega `.env`, registra `EventOrmEntity`, a migration real e a tabela de historico `migrations`; tambem mantem `synchronize: false`. Os imports relativos usam extensao `.js`, conforme o projeto ESM/NodeNext.

Em `NODE_ENV=test`, `AppModule` e `EventsModule` nao abrem conexao PostgreSQL e preservam o provider em memoria. Isso mantem os testes unitarios, HTTP e integrados em memoria sem banco ativo. O teste PostgreSQL e separado por `vitest.config.postgres.ts` e cria seu DataSource usando exclusivamente as variaveis `TEST_DB_*`.

## Scripts

- `pnpm migration:show`: compila e consulta o historico/configuracao, sem aplicar migration.
- `pnpm migration:run`: compila e aplica migrations ao banco indicado por `DB_*`. Foi executado com essas variaveis temporariamente apontando para o banco de teste verificado.
- `pnpm test:integration`: executa apenas `test/**/*.postgres.integration.test.ts`.

`pnpm migration:run` foi executado depois de confirmar identidade, ausencia da tabela `events`, ausencia do historico `migrations` e ausencia do tipo `events_status_enum`. O TypeORM criou o historico e aplicou `CreateEventsTable1794873600000`. As variaveis temporarias foram removidas ao final. `pnpm migration:show` nao foi executado.

## Evidencias e pendencias

`pnpm build`, `pnpm exec tsc --noEmit`, `pnpm lint` e `pnpm test --run` passaram; a suite principal terminou com 4 arquivos e 14 testes aprovados. `pnpm test:integration` passou com 1 teste.

A consulta SQL confirmou `current_database() = arenaxviii_test_db`, `current_user = arenaxviii_test_user`, porta interna 5432, as 11 colunas de `events`, uma linha no historico `migrations` e zero eventos antes do teste de integracao. O banco de desenvolvimento e a conexao do AppModule com ele ainda nao foram verificados.
