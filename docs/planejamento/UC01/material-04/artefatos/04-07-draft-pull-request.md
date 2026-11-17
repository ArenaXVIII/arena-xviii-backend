# 04-07 — Draft Pull Request

**Issue vinculada:** [#26 — UC01/SUB-06](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26)  
**Branch de origem:** `test/26-uc01-sub06-event-registration-e2e`  
**Branch de destino:** `main`  
**Status:** não criado. A tentativa com `gh pr create --draft` foi bloqueada porque o GitHub CLI não está autenticado (`gh auth login` ou `GH_TOKEN` necessário).  
**URL real do PR:** inexistente até sua criação. O GitHub sugeriu [abrir o formulário de criação](https://github.com/ArenaXVIII/arena-xviii-backend/pull/new/test/26-uc01-sub06-event-registration-e2e); isso não é um PR criado.

## Descrição preparada (não submetida)

```markdown
## Draft Pull Request — [UC01][SUB-06] Testes e2e do cadastro de evento

### Issue vinculada
Ref: #26

### Objetivo
Adicionar o primeiro teste e2e do fluxo principal de cadastro, com nome válido e confirmação do identificador retornado.

### Alterações
- Criação de `test/events.e2e-spec.ts`.
- Cenário via Supertest usando `POST /events`, payload com nome válido, expectativa HTTP 201 e identificador `eventId`.
- A rota H01 e o status 201 são hipóteses técnicas ainda pendentes de validação pela equipe.

### Evidência TDD RED
Comando: `pnpm test:e2e`

```text
Error: expected 201 "Created", got 404 "Not Found"
Test Files  1 failed | 1 passed (2)
     Tests  1 failed | 1 passed (2)
```

### Estado e próximos passos
- [x] Branch criada a partir de `main` e publicada com upstream.
- [x] Teste automatizado escrito e falhando funcionalmente (RED).
- [x] Commit atômico registrado: `be16843e38aaee159aaf3b05c4040310ff79f5d7`.
- [ ] Concluir SUB-04 (#24) e SUB-05 (#25), e validar o DoR.
- [ ] Completar os cenários e2e de sucesso/persistência, FA01 e FE01.
- [ ] Implementar GREEN e REFACTOR em etapa posterior.
- [ ] Registrar revisão por par e atualizar o Project.

Este PR deve ser Draft e não deve ser integrado até a conclusão das etapas subsequentes.
```

**Observação:** nenhuma PR foi aberta nem descrição submetida; o conteúdo acima é somente a minuta preparada.
