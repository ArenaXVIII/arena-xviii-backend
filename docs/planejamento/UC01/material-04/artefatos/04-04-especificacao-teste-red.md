# 04-04 — Especificação do teste RED

**Sub-Issue:** UC01/SUB-06 — testes e2e do cadastro de evento  
**Critério escolhido:** no fluxo principal, uma requisição válida de cadastro obtém sucesso e retorna um identificador para o evento (FP-1/FP-5).  
**Arquivo:** `test/events.e2e-spec.ts`

## Escopo e hipótese

O nível e2e foi escolhido para exercitar a API HTTP inicializada pelo `AppModule` usando Supertest. O escopo deste primeiro teste é intencionalmente um critério, não a cobertura integral da SUB-06.

A rota `POST /events` é a proposta H01, ainda sujeita à validação da equipe. O teste usa HTTP 201, comportamento padrão de criação no NestJS, e espera `eventId` conforme FP-5. Esses detalhes são hipóteses do teste, não decisões formalmente aprovadas. A leitura posterior do estado persistido, FA01 e FE01 permanecem fora deste primeiro cenário.

## Código

```ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';

describe('Events API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates an event and returns its identifier for a valid name', async () => {
    const payload = { name: 'Arena XVIII Opening Event' };

    await request(app.getHttpServer())
      .post('/events')
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body.eventId).toBeTruthy();
      });
  });
});
```

## Dependências e execução

- Dependências: `@nestjs/testing`, `supertest`, Vitest e o `AppModule` existente.
- Configuração e2e: `vitest.config.e2e.ts`.
- Comando: `pnpm test:e2e`.
- Não foi adicionada nem alterada implementação de produção.
