# 04-03 — Preparação da branch

**Issue vinculada:** [#26 — UC01/SUB-06](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26)  
**Branch:** `test/26-uc01-sub06-event-registration-e2e`  
**Base:** `main` (`aec8a9db0ab8127ef3baa3c7a06f012ec03d684d`)  
**Padrão:** `test/<issue-id>-<descricao-curta>`.

## Criação e verificação local

```text
git switch -c test/26-uc01-sub06-event-registration-e2e
Switched to a new branch 'test/26-uc01-sub06-event-registration-e2e'
```

```text
git branch -vv
* test/26-uc01-sub06-event-registration-e2e aec8a9d ...
  main                                      aec8a9d [origin/main] ...
```

## Publicação e upstream

```text
git push -u origin test/26-uc01-sub06-event-registration-e2e
branch 'test/26-uc01-sub06-event-registration-e2e' set up to track
'origin/test/26-uc01-sub06-event-registration-e2e'.
* [new branch] test/26-uc01-sub06-event-registration-e2e
  -> test/26-uc01-sub06-event-registration-e2e
```

O parâmetro `-u` configurou `origin/test/26-uc01-sub06-event-registration-e2e` como upstream da branch local.
