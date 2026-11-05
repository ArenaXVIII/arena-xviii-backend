# ARENA XVIII

**Administração de Recursos, Esportes, Negócios e Associados**

Sistema de Gestão da Atlética XVIII de Março, da UTFPR Câmpus Medianeira.

---

## Problema

A gestão de uma atlética universitária envolve associados, modalidades esportivas, equipes, treinos, eventos, campeonatos, finanças, patrocínios e materiais. Hoje essas informações ficam espalhadas, as atividades são realizadas de forma pouco padronizada e as responsabilidades não são claras: pessoas com funções diferentes acabam executando tarefas que não estavam associadas ao seu papel.

## Objetivo geral

Desenvolver uma plataforma que centralize e organize as atividades administrativas e esportivas da atlética, apoiando:

- a gestão de associados e atletas;
- a organização de modalidades, equipes e treinos;
- o planejamento e o acompanhamento de eventos e campeonatos, do planejamento ao fechamento financeiro;
- o controle financeiro, incluindo mensalidades, pagamentos, despesas e patrocínios;
- o controle de estoque de materiais esportivos e uniformes.

## Contexto acadêmico

Projeto desenvolvido na disciplina **Desenvolvimento de Sistemas Corporativos**, ministrada pelo professor **Everton Coimbra de Araujo**, na Universidade Tecnológica Federal do Paraná (UTFPR), Câmpus Medianeira.

O tema se relaciona ao item "Sistema de gestão de associações e clubes", com foco específico em atléticas universitárias.

## Equipe

- Adriel Ostrovski
- Bolivar Torres Neto
- Luna Ribeiro

## Tecnologia

- **Node.js 24**
- **pnpm 12** (único gerenciador de dependências; não use npm nem yarn para instalar)
- **NestJS 12** (TypeScript, ESM) com **Vitest** para testes

## Como executar

Pré-requisitos: Node.js 24 e pnpm 12 (`node -v`, `pnpm -v`). A Nest CLI global **não** é necessária: o projeto usa a CLI local.

```bash
pnpm install       # instala as dependências do pnpm-lock.yaml
pnpm start:dev     # inicia em modo watch em http://localhost:3000
pnpm test          # testes unitários
pnpm test:e2e      # testes ponta a ponta
```

Para validar, com a aplicação rodando:

```bash
curl -i http://localhost:3000/   # esperado: HTTP/1.1 200 OK e "Hello World!"
```

Ou abra [`requests.http`](requests.http) no VS Code com a extensão REST Client.

A porta pode ser alterada pela variável de ambiente `PORT`.

## Desenvolvimento incremental por slices

O sistema será construído de forma incremental, por **slices verticais**. Cada slice implementa um caso de uso completo, atravessando todas as camadas da aplicação, em vez de construir cada camada isoladamente. Assim, a arquitetura é validada desde cedo com uma funcionalidade real e evolui conforme novos slices são adicionados.

### Primeiro slice arquitetural

**UC03 — Divulgar Evento** (épico [#12](https://github.com/ArenaXVIII/arena-xviii-backend/issues/12)). Situação atual: a base técnica NestJS está validada (`GET /` → `Hello World!`); o slice está em implementação e ainda não é acessível por HTTP.

## Documentação

A documentação do projeto está na pasta [`docs/`](docs/):

- [`visao-geral.md`](docs/visao-geral.md): modelo conceitual do domínio, com conceitos, entidades e objetos de valor, relações, cardinalidades, regras de negócio, invariantes, ciclo de vida do Evento e pendências de governança.
- [`casos-de-uso.md`](docs/casos-de-uso.md): catálogo e especificações dos casos de uso.
- [`planejamento/`](docs/planejamento/README.md): planejamento da implementação por caso de uso.
- [`02-base-tecnica-nestjs-12.md`](docs/02-base-tecnica-nestjs-12.md): validação da base técnica NestJS 12 e planejamento do primeiro slice.
