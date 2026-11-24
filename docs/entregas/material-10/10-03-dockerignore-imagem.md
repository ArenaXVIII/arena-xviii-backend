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

## Correcao de evidencias em 2026-11-23

- `.dockerignore` confirmado no codigo e adequado para excluir dependencias, build, Git, arquivos `.env` privados e artefatos locais.
- `.env.example` permanece no contexto, sem segredos.
- O build Docker nao foi executado nesta atividade porque `docker` nao esta instalado ou acessivel.
- Nao houve identificacao nova de imagem, ID ou tamanho nesta atividade.

## Verificacao real da imagem em 2026-11-24

- `docker compose build api` concluiu com imagem `arenaxviii-api:dev`.
- ID observado: `9d17e1bfcc89`.
- `.dockerignore` excluiu `.env` e o contexto nao expos arquivos privados no build.
- O build confirmou que o lockfile congelado esta valido.

