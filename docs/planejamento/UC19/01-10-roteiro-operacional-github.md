# Artefato 10 — Roteiro Operacional de Configuração no GitHub

**Caso de uso:** UC19 — Cadastrar Modalidade

Repositório: `ArenaXVIII/arena-xviii-backend` · Project: **Arena XVIII** (#3, organização ArenaXVIII).

1. **Labels:** garanta que existam (`gh label create ... --force`; cores em `docs/planejamento/README.md`): `layer:api`, `layer:application`, `layer:domain`, `layer:infra`, `module:esportes`, `priority:high`, `priority:low`, `priority:medium`, `spec:rascunho`, `type:documentation`, `type:epic`, `type:feature`, `type:test`, `uc:UC19`.
2. **Épico:** crie a Issue `[UC19] Cadastrar Modalidade` com o corpo do Artefato 3 e as labels indicadas; anote o número.
3. **Sub-Issues:** crie as 7 Issues do Artefato 4 (SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07), com labels e responsável.
4. **Vínculo:** vincule as Sub-Issues ao épico (sub-issues nativas: `POST /repos/{owner}/{repo}/issues/{epic}/sub_issues`).
5. **Referências:** substitua `SUB-XX` e as referências a outros casos de uso pelos números reais (épico e Sub-Issues).
6. **Revisão:** confira objetivo, origem, critérios de aceite e evidências em cada Issue.
7. **Project:** confirme a inclusão automática no board #3 (ou adicione com `gh project item-add 3 --owner ArenaXVIII --url <url>`).
8. **Status:** deixe todos os itens em `Backlog` (especificação em Rascunho).
9. **Responsável:** atribua `@LunaRibeiro` (ou o responsável definido pela equipe).
10. **Verificação final:** compare com as matrizes dos Artefatos 5 e 6 e execute o checklist do Artefato 11.
