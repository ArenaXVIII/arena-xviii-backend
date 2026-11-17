# 09-06 - Evidencias da persistencia real e durabilidade

## Estado da verificacao

**Pendente - nao executado.** O Docker Desktop nao estava ativo e a conexao de teste em `localhost:5434` retornou `ECONNREFUSED`. A migration nao foi aplicada. Portanto, nao ha UUID real, resposta HTTP persistida nem consulta SQL que possa ser registrada como evidência.

Nenhuma conclusao de durabilidade e declarada. Nenhum endpoint de consulta foi adicionado.

## Roteiro para obter a evidencia

Com Docker Desktop ativo, `.env` local configurado e migration de desenvolvimento aplicada somente depois de confirmar o banco de destino:

1. Iniciar o backend com `pnpm start:dev` e as variaveis `DB_*` apontando ao banco de desenvolvimento.
2. Enviar uma requisicao real:

```http
POST http://localhost:3000/events
Content-Type: application/json

{"name":"Evento de verificacao Material 09"}
```

3. Registrar o status HTTP e o corpo JSON reais. A resposta implementada inclui `eventId`, `status`, `createdAt` e `message`.
4. Copiar o `eventId` realmente retornado e consultar diretamente o PostgreSQL:

```sql
SELECT *
FROM "events"
WHERE "eventId" = 'UUID_REAL_DA_RESPOSTA';
```

5. Encerrar somente o processo NestJS, mantendo o PostgreSQL e o volume ativos; reiniciar o backend e repetir exatamente a consulta pelo mesmo UUID.
6. Registrar as duas saidas SQL reais e comparar os campos.

Os passos acima sao procedimento futuro, nao comandos ou resultados executados nesta atividade. A data, status HTTP, corpo, UUID e saidas SQL permanecem pendentes.
