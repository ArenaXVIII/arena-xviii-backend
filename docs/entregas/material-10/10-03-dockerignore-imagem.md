# 10-03 - .dockerignore e imagem

## .dockerignore criado

Foram excluidos `node_modules`, `dist`, `coverage`, `.git`, `.env`, `.env.*`, logs, tsbuildinfo e diretórios de IDE. `.env.example` permanece incluído.

## Contexto de build

O contexto de build nao incluiu secrets locais nem dependencias instaladas. Os arquivos `package.json` e `pnpm-lock.yaml` foram preservados.

## Construcao

Comando executado:

```bash
docker build -t arenaxviii-api:dev .
```

Resultado:

- Multi-stage concluido.
- Build stage compilou o NestJS.
- Runtime stage instalou dependencias de producao.
- Imagem `arenaxviii-api:dev` identificada.
- Nenhum erro impeditivo observado.

