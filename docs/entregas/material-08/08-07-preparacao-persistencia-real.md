# 08-07 - Preparacao para persistencia real

O repository em memoria e adequado para testes e desenvolvimento, mas perde dados ao reiniciar o processo, nao oferece transacoes, concorrencia coordenada, constraints, indices ou durabilidade.

A evolucao recomendada e criar uma implementacao PostgreSQL por tras do mesmo token `EVENTS_REPOSITORY`, usando TypeORM ou Prisma em uma etapa posterior. O contrato deve continuar expressando as operacoes de aplicacao, enquanto o adaptador traduz `Event` para o modelo persistido.

Etapas futuras:

1. escolher PostgreSQL e ORM;
2. modelar tabela, status, datas e relacionamentos;
3. criar migrations;
4. implementar o adaptador concreto;
5. configurar ambiente e transacoes;
6. manter testes unitarios com doubles e adicionar testes de integracao com banco isolado;
7. substituir o provider por configuracao de ambiente.

Nenhum banco, ORM ou migration foi implementado nesta unidade.
