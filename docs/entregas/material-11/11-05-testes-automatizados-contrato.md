# 11-05 - Testes automatizados do contrato

## Configuracao

A suite rapida passou a incluir:

- `**/*.spec.ts`
- `test/**/*.http-spec.ts`

As suites `*.e2e-spec.ts` nao foram incluidas e nao foram executadas.

## Testes de cadastro

Arquivo: `test/events-create.http-spec.ts`

Cenarios:

- retorno 201 com contrato fechado;
- remocao da propriedade interna simulada;
- campo extra de entrada removido pelo whitelist;
- nome vazio rejeitado com 400;
- corpo vazio rejeitado com 400;
- nome com espacos rejeitado com 422;
- nome nao-string rejeitado com 400;
- Service nao chamado nas entradas invalidas.

## Testes de divulgacao

Arquivo: `test/events-publish.http-spec.ts`

- resposta HTTP 200 com contrato fechado;
- propriedade interna simulada removida;
- identificador em branco rejeitado antes da chamada ao Service.

## Resultados

Linha de base anterior:

- `pnpm test`: 4 arquivos, 14 testes aprovados.
- `pnpm test:integration`: 1 arquivo, 1 teste aprovado.

Linha de base apos esta atividade:

- `pnpm test`: 6 arquivos, 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo, 1 teste aprovado.
- `pnpm build`: aprovado.

## E2E

Nao executado. Os testes legados sobem `AppModule` completo e podem usar a configuracao do banco de desenvolvimento. Esta verificacao foi evitada conforme a restricao de seguranca do Material 11.

## Verificacao pos-atividade em 2026-11-24

- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado no banco isolado.
- `pnpm lint`: aprovado sem erros.
- Nao houve regressao nas suites executadas.
- O teste de divulgacao continua cobrindo retorno fechado e `internalNote` nao exposto.
