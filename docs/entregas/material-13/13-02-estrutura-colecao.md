# 13-02 - Estrutura da colecao

## Arquivos criados

```text
http-rest-client/
├── tests/hello-world.http
├── events/
│   ├── events-controller.http
│   └── test-scenarios.http
└── containerizado/
    ├── 00-smoke.http
    ├── 01-events-divulgar-evento.http
    ├── 02-apoio.http
    ├── README.md
    └── run-checks.sh
```

## Convenções

- Todos os arquivos HTTP usam `@baseUrl = http://localhost:3000`.
- Cada requisição possui um título com o status esperado.
- Os arquivos `.http` são documentação manual e não fazem asserções.
- O encadeamento `# @name criarEvento` foi criado no cenário containerizado.
- Nenhuma credencial foi versionada.
- Foram identificados 8 arquivos na coleção; todos os 6 `.http` declaram a base `http://localhost:3000` e cada requisição possui título com status esperado.
- O bit executável existe no filesystem (`test -x` passou). O arquivo ainda não está no índice Git; portanto, o modo Git `100755` permanece não confirmado.
