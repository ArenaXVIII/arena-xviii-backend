# Artefato 6 — Matriz de Dependências

**Caso de uso:** UC04 — Iniciar Vendas/Inscrições

## 1. Matriz

| Atividade | Depende de | Dependências externas | Justificativa técnica | Condição de desbloqueio | Paralelo |
|---|---|---|---|---|---|
| SUB-01 | — | #13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`) | Regras de domínio são a base das demais camadas | Especificação validada | Não |
| SUB-02 | SUB-01 | #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01) | Contratos referenciam tipos do domínio | SUB-01 em `Done` | Não |
| SUB-03 | SUB-01, SUB-02 | #15 (UC03 · SUB-03 — `EventsService`) | Orquestra domínio e contratos | SUB-01, SUB-02 em `Done` | Não |
| SUB-04 | SUB-03 | #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`) | Delega ao serviço e injeta o adaptador concreto | SUB-03 em `Done` | Não |
| SUB-05 | SUB-04 | #16 (UC03 · SUB-04 — adaptador de persistência de eventos) | Exige a aplicação completa | SUB-04 em `Done` | Não |
| SUB-06 | SUB-04, SUB-05 | — | Documenta o contrato verificado | SUB-04, SUB-05 em `Done` | Parcial (redação antecipada) |

## 2. Grafo de dependências

```mermaid
flowchart LR
    SUB01["SUB-01 · Domínio"]
    SUB02["SUB-02 · Contratos"]
    SUB03["SUB-03 · Serviço"]
    SUB04["SUB-04 · API HTTP"]
    SUB05["SUB-05 · Testes e2e"]
    SUB06["SUB-06 · Documentação"]
    SUB01 --> SUB02
    SUB01 --> SUB03
    SUB02 --> SUB03
    SUB03 --> SUB04
    SUB04 --> SUB05
    SUB04 --> SUB06
    SUB05 --> SUB06
```

## 3. Dependências entre casos de uso

| Caso de uso | Motivo |
|---|---|
| UC03 | o evento precisa estar Divulgado |

## 4. Caminho crítico

**SUB-01 → SUB-02 → SUB-03 → SUB-04 → SUB-05 → SUB-06**

- Não há dependências circulares.
- Bloqueios não técnicos: validação da especificação, propostas técnicas e dúvidas em aberto.
