# Execução no GitHub — Ondas 1 e 2 (Evidências)

| Item | Valor |
|---|---|
| Data | 03/11/2026 |
| Executado por | `@LunaRibeiro`, via GitHub CLI |
| Repositório | [`ArenaXVIII/arena-xviii-backend`](https://github.com/ArenaXVIII/arena-xviii-backend) |
| Project | [Arena XVIII (#3)](https://github.com/orgs/ArenaXVIII/projects/3) |
| Planejamento de origem | `docs/planejamento/UCnn/01-03` e `01-04` |

## 1. Escopo publicado

Foram publicados os casos de uso das ondas 1 e 2 (ver `docs/planejamento/README.md`), **exceto o UC18**, que requer modelagem antes da implementação. Os casos das ondas 3 e 4 e o UC18 permanecem documentados no repositório e serão publicados após a validação das especificações.

| Caso de uso | Épico | Sub-Issues | Status no board |
|---|---|---|---|
| UC01 — Cadastrar Evento | [#20](https://github.com/ArenaXVIII/arena-xviii-backend/issues/20) | #21 a #27 (7) | `Backlog` |
| UC15 — Cadastrar Patrocinador | [#28](https://github.com/ArenaXVIII/arena-xviii-backend/issues/28) | #29 a #35 (7) | `Backlog` |
| UC17 — Cadastrar Associado | [#36](https://github.com/ArenaXVIII/arena-xviii-backend/issues/36) | #37 a #43 (7) | `Backlog` |
| UC19 — Cadastrar Modalidade | [#44](https://github.com/ArenaXVIII/arena-xviii-backend/issues/44) | #45 a #51 (7) | `Backlog` |
| UC22 — Cadastrar Campeonato | [#52](https://github.com/ArenaXVIII/arena-xviii-backend/issues/52) | #53 a #60 (8) | `Backlog` |
| UC24 — Cadastrar Material | [#61](https://github.com/ArenaXVIII/arena-xviii-backend/issues/61) | #62 a #69 (8) | `Backlog` |
| UC02 — Definir Planejamento do Evento | [#70](https://github.com/ArenaXVIII/arena-xviii-backend/issues/70) | #71 a #77 (7) | `Backlog` |
| UC04 — Iniciar Vendas/Inscrições | [#78](https://github.com/ArenaXVIII/arena-xviii-backend/issues/78) | #79 a #84 (6) | `Backlog` |
| UC20 — Cadastrar Equipe | [#85](https://github.com/ArenaXVIII/arena-xviii-backend/issues/85) | #86 a #92 (7) | `Backlog` |
| UC25 — Registrar Movimentação de Estoque | [#93](https://github.com/ArenaXVIII/arena-xviii-backend/issues/93) | #94 a #100 (7) | `Backlog` |

**Total:** 10 épicos e 71 Sub-Issues, todos abertos, atribuídos a @LunaRibeiro, em `Backlog` e vinculados aos épicos como sub-issues nativas.

## 2. Correspondência completa

| Caso de uso | ID Provisório | Número Real | Título | Estado no Board | Responsável |
| :--- | :--- | :--- | :--- | :--- | :--- |
| UC01 | Epic | [#20](https://github.com/ArenaXVIII/arena-xviii-backend/issues/20) | [UC01] Cadastrar Evento | Backlog | @LunaRibeiro |
| UC01 | `SUB-01` | [#21](https://github.com/ArenaXVIII/arena-xviii-backend/issues/21) | Implementar no domínio a criação de evento | Backlog | @LunaRibeiro |
| UC01 | `SUB-02` | [#22](https://github.com/ArenaXVIII/arena-xviii-backend/issues/22) | Definir os contratos de aplicação do cadastro de evento | Backlog | @LunaRibeiro |
| UC01 | `SUB-03` | [#23](https://github.com/ArenaXVIII/arena-xviii-backend/issues/23) | Implementar o serviço de aplicação do cadastro de evento | Backlog | @LunaRibeiro |
| UC01 | `SUB-04` | [#24](https://github.com/ArenaXVIII/arena-xviii-backend/issues/24) | Estender o adaptador de persistência de eventos para o cadastro | Backlog | @LunaRibeiro |
| UC01 | `SUB-05` | [#25](https://github.com/ArenaXVIII/arena-xviii-backend/issues/25) | Expor o cadastro de evento via API HTTP | Backlog | @LunaRibeiro |
| UC01 | `SUB-06` | [#26](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento | Backlog | @LunaRibeiro |
| UC01 | `SUB-07` | [#27](https://github.com/ArenaXVIII/arena-xviii-backend/issues/27) | Documentar tecnicamente o cadastro de evento | Backlog | @LunaRibeiro |
| UC15 | Epic | [#28](https://github.com/ArenaXVIII/arena-xviii-backend/issues/28) | [UC15] Cadastrar Patrocinador | Backlog | @LunaRibeiro |
| UC15 | `SUB-01` | [#29](https://github.com/ArenaXVIII/arena-xviii-backend/issues/29) | Modelar a entidade Patrocinador e suas regras | Backlog | @LunaRibeiro |
| UC15 | `SUB-02` | [#30](https://github.com/ArenaXVIII/arena-xviii-backend/issues/30) | Definir os contratos de aplicação do cadastro de patrocinador | Backlog | @LunaRibeiro |
| UC15 | `SUB-03` | [#31](https://github.com/ArenaXVIII/arena-xviii-backend/issues/31) | Implementar o serviço de aplicação do cadastro de patrocinador | Backlog | @LunaRibeiro |
| UC15 | `SUB-04` | [#32](https://github.com/ArenaXVIII/arena-xviii-backend/issues/32) | Implementar o adaptador de persistência de patrocinadores | Backlog | @LunaRibeiro |
| UC15 | `SUB-05` | [#33](https://github.com/ArenaXVIII/arena-xviii-backend/issues/33) | Expor o cadastro de patrocinador via API HTTP | Backlog | @LunaRibeiro |
| UC15 | `SUB-06` | [#34](https://github.com/ArenaXVIII/arena-xviii-backend/issues/34) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de patrocinador | Backlog | @LunaRibeiro |
| UC15 | `SUB-07` | [#35](https://github.com/ArenaXVIII/arena-xviii-backend/issues/35) | Documentar tecnicamente o cadastro de patrocinador | Backlog | @LunaRibeiro |
| UC17 | Epic | [#36](https://github.com/ArenaXVIII/arena-xviii-backend/issues/36) | [UC17] Cadastrar Associado | Backlog | @LunaRibeiro |
| UC17 | `SUB-01` | [#37](https://github.com/ArenaXVIII/arena-xviii-backend/issues/37) | Modelar a entidade Associado e suas regras | Backlog | @LunaRibeiro |
| UC17 | `SUB-02` | [#38](https://github.com/ArenaXVIII/arena-xviii-backend/issues/38) | Definir os contratos de aplicação do cadastro de associado | Backlog | @LunaRibeiro |
| UC17 | `SUB-03` | [#39](https://github.com/ArenaXVIII/arena-xviii-backend/issues/39) | Implementar o serviço de aplicação do cadastro de associado | Backlog | @LunaRibeiro |
| UC17 | `SUB-04` | [#40](https://github.com/ArenaXVIII/arena-xviii-backend/issues/40) | Implementar o adaptador de persistência de associados | Backlog | @LunaRibeiro |
| UC17 | `SUB-05` | [#41](https://github.com/ArenaXVIII/arena-xviii-backend/issues/41) | Expor o cadastro de associado via API HTTP | Backlog | @LunaRibeiro |
| UC17 | `SUB-06` | [#42](https://github.com/ArenaXVIII/arena-xviii-backend/issues/42) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de associado | Backlog | @LunaRibeiro |
| UC17 | `SUB-07` | [#43](https://github.com/ArenaXVIII/arena-xviii-backend/issues/43) | Documentar tecnicamente o cadastro de associado | Backlog | @LunaRibeiro |
| UC19 | Epic | [#44](https://github.com/ArenaXVIII/arena-xviii-backend/issues/44) | [UC19] Cadastrar Modalidade | Backlog | @LunaRibeiro |
| UC19 | `SUB-01` | [#45](https://github.com/ArenaXVIII/arena-xviii-backend/issues/45) | Modelar a entidade Modalidade e suas regras | Backlog | @LunaRibeiro |
| UC19 | `SUB-02` | [#46](https://github.com/ArenaXVIII/arena-xviii-backend/issues/46) | Definir os contratos de aplicação do cadastro de modalidade | Backlog | @LunaRibeiro |
| UC19 | `SUB-03` | [#47](https://github.com/ArenaXVIII/arena-xviii-backend/issues/47) | Implementar o serviço de aplicação do cadastro de modalidade | Backlog | @LunaRibeiro |
| UC19 | `SUB-04` | [#48](https://github.com/ArenaXVIII/arena-xviii-backend/issues/48) | Implementar o adaptador de persistência de modalidades | Backlog | @LunaRibeiro |
| UC19 | `SUB-05` | [#49](https://github.com/ArenaXVIII/arena-xviii-backend/issues/49) | Expor o cadastro de modalidade via API HTTP | Backlog | @LunaRibeiro |
| UC19 | `SUB-06` | [#50](https://github.com/ArenaXVIII/arena-xviii-backend/issues/50) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de modalidade | Backlog | @LunaRibeiro |
| UC19 | `SUB-07` | [#51](https://github.com/ArenaXVIII/arena-xviii-backend/issues/51) | Documentar tecnicamente o cadastro de modalidade | Backlog | @LunaRibeiro |
| UC22 | Epic | [#52](https://github.com/ArenaXVIII/arena-xviii-backend/issues/52) | [UC22] Cadastrar Campeonato | Backlog | @LunaRibeiro |
| UC22 | `SUB-01` | [#53](https://github.com/ArenaXVIII/arena-xviii-backend/issues/53) | Modelar o Objeto de Valor Período | Backlog | @LunaRibeiro |
| UC22 | `SUB-02` | [#54](https://github.com/ArenaXVIII/arena-xviii-backend/issues/54) | Modelar a entidade Campeonato e suas regras | Backlog | @LunaRibeiro |
| UC22 | `SUB-03` | [#55](https://github.com/ArenaXVIII/arena-xviii-backend/issues/55) | Definir os contratos de aplicação do cadastro de campeonato | Backlog | @LunaRibeiro |
| UC22 | `SUB-04` | [#56](https://github.com/ArenaXVIII/arena-xviii-backend/issues/56) | Implementar o serviço de aplicação do cadastro de campeonato | Backlog | @LunaRibeiro |
| UC22 | `SUB-05` | [#57](https://github.com/ArenaXVIII/arena-xviii-backend/issues/57) | Implementar o adaptador de persistência de campeonatos | Backlog | @LunaRibeiro |
| UC22 | `SUB-06` | [#58](https://github.com/ArenaXVIII/arena-xviii-backend/issues/58) | Expor o cadastro de campeonato via API HTTP | Backlog | @LunaRibeiro |
| UC22 | `SUB-07` | [#59](https://github.com/ArenaXVIII/arena-xviii-backend/issues/59) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de campeonato | Backlog | @LunaRibeiro |
| UC22 | `SUB-08` | [#60](https://github.com/ArenaXVIII/arena-xviii-backend/issues/60) | Documentar tecnicamente o cadastro de campeonato | Backlog | @LunaRibeiro |
| UC24 | Epic | [#61](https://github.com/ArenaXVIII/arena-xviii-backend/issues/61) | [UC24] Cadastrar Material | Backlog | @LunaRibeiro |
| UC24 | `SUB-01` | [#62](https://github.com/ArenaXVIII/arena-xviii-backend/issues/62) | Modelar o Objeto de Valor Quantidade | Backlog | @LunaRibeiro |
| UC24 | `SUB-02` | [#63](https://github.com/ArenaXVIII/arena-xviii-backend/issues/63) | Modelar a entidade Material e suas regras | Backlog | @LunaRibeiro |
| UC24 | `SUB-03` | [#64](https://github.com/ArenaXVIII/arena-xviii-backend/issues/64) | Definir os contratos de aplicação do cadastro de material | Backlog | @LunaRibeiro |
| UC24 | `SUB-04` | [#65](https://github.com/ArenaXVIII/arena-xviii-backend/issues/65) | Implementar o serviço de aplicação do cadastro de material | Backlog | @LunaRibeiro |
| UC24 | `SUB-05` | [#66](https://github.com/ArenaXVIII/arena-xviii-backend/issues/66) | Implementar o adaptador de persistência de materiais | Backlog | @LunaRibeiro |
| UC24 | `SUB-06` | [#67](https://github.com/ArenaXVIII/arena-xviii-backend/issues/67) | Expor o cadastro de material via API HTTP | Backlog | @LunaRibeiro |
| UC24 | `SUB-07` | [#68](https://github.com/ArenaXVIII/arena-xviii-backend/issues/68) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de material | Backlog | @LunaRibeiro |
| UC24 | `SUB-08` | [#69](https://github.com/ArenaXVIII/arena-xviii-backend/issues/69) | Documentar tecnicamente o cadastro de material | Backlog | @LunaRibeiro |
| UC02 | Epic | [#70](https://github.com/ArenaXVIII/arena-xviii-backend/issues/70) | [UC02] Definir Planejamento do Evento | Backlog | @LunaRibeiro |
| UC02 | `SUB-01` | [#71](https://github.com/ArenaXVIII/arena-xviii-backend/issues/71) | Modelar o Objeto de Valor Valor Monetário | Backlog | @LunaRibeiro |
| UC02 | `SUB-02` | [#72](https://github.com/ArenaXVIII/arena-xviii-backend/issues/72) | Implementar no domínio a operação de definição de planejamento de evento | Backlog | @LunaRibeiro |
| UC02 | `SUB-03` | [#73](https://github.com/ArenaXVIII/arena-xviii-backend/issues/73) | Definir os contratos de aplicação da definição de planejamento do evento | Backlog | @LunaRibeiro |
| UC02 | `SUB-04` | [#74](https://github.com/ArenaXVIII/arena-xviii-backend/issues/74) | Implementar o serviço de aplicação da definição de planejamento do evento | Backlog | @LunaRibeiro |
| UC02 | `SUB-05` | [#75](https://github.com/ArenaXVIII/arena-xviii-backend/issues/75) | Expor a definição de planejamento via API HTTP | Backlog | @LunaRibeiro |
| UC02 | `SUB-06` | [#76](https://github.com/ArenaXVIII/arena-xviii-backend/issues/76) | Implementar os testes de integração ponta a ponta (e2e) da definição de planejamento do evento | Backlog | @LunaRibeiro |
| UC02 | `SUB-07` | [#77](https://github.com/ArenaXVIII/arena-xviii-backend/issues/77) | Documentar tecnicamente a definição de planejamento | Backlog | @LunaRibeiro |
| UC04 | Epic | [#78](https://github.com/ArenaXVIII/arena-xviii-backend/issues/78) | [UC04] Iniciar Vendas/Inscrições | Backlog | @LunaRibeiro |
| UC04 | `SUB-01` | [#79](https://github.com/ArenaXVIII/arena-xviii-backend/issues/79) | Implementar no domínio a operação de início de vendas/inscrições | Backlog | @LunaRibeiro |
| UC04 | `SUB-02` | [#80](https://github.com/ArenaXVIII/arena-xviii-backend/issues/80) | Definir os contratos de aplicação do início de vendas/inscrições | Backlog | @LunaRibeiro |
| UC04 | `SUB-03` | [#81](https://github.com/ArenaXVIII/arena-xviii-backend/issues/81) | Implementar o serviço de aplicação do início de vendas/inscrições | Backlog | @LunaRibeiro |
| UC04 | `SUB-04` | [#82](https://github.com/ArenaXVIII/arena-xviii-backend/issues/82) | Expor o início de vendas/inscrições via API HTTP | Backlog | @LunaRibeiro |
| UC04 | `SUB-05` | [#83](https://github.com/ArenaXVIII/arena-xviii-backend/issues/83) | Implementar os testes de integração ponta a ponta (e2e) do início de vendas/inscrições | Backlog | @LunaRibeiro |
| UC04 | `SUB-06` | [#84](https://github.com/ArenaXVIII/arena-xviii-backend/issues/84) | Documentar tecnicamente o início de vendas/inscrições | Backlog | @LunaRibeiro |
| UC20 | Epic | [#85](https://github.com/ArenaXVIII/arena-xviii-backend/issues/85) | [UC20] Cadastrar Equipe | Backlog | @LunaRibeiro |
| UC20 | `SUB-01` | [#86](https://github.com/ArenaXVIII/arena-xviii-backend/issues/86) | Modelar a entidade Equipe e suas regras | Backlog | @LunaRibeiro |
| UC20 | `SUB-02` | [#87](https://github.com/ArenaXVIII/arena-xviii-backend/issues/87) | Definir os contratos de aplicação do cadastro de equipe | Backlog | @LunaRibeiro |
| UC20 | `SUB-03` | [#88](https://github.com/ArenaXVIII/arena-xviii-backend/issues/88) | Implementar o serviço de aplicação do cadastro de equipe | Backlog | @LunaRibeiro |
| UC20 | `SUB-04` | [#89](https://github.com/ArenaXVIII/arena-xviii-backend/issues/89) | Implementar o adaptador de persistência de equipes | Backlog | @LunaRibeiro |
| UC20 | `SUB-05` | [#90](https://github.com/ArenaXVIII/arena-xviii-backend/issues/90) | Expor o cadastro de equipe via API HTTP | Backlog | @LunaRibeiro |
| UC20 | `SUB-06` | [#91](https://github.com/ArenaXVIII/arena-xviii-backend/issues/91) | Implementar os testes de integração ponta a ponta (e2e) do cadastro de equipe | Backlog | @LunaRibeiro |
| UC20 | `SUB-07` | [#92](https://github.com/ArenaXVIII/arena-xviii-backend/issues/92) | Documentar tecnicamente o cadastro de equipe | Backlog | @LunaRibeiro |
| UC25 | Epic | [#93](https://github.com/ArenaXVIII/arena-xviii-backend/issues/93) | [UC25] Registrar Movimentação de Estoque | Backlog | @LunaRibeiro |
| UC25 | `SUB-01` | [#94](https://github.com/ArenaXVIII/arena-xviii-backend/issues/94) | Modelar a entidade Movimentação de Estoque e suas regras | Backlog | @LunaRibeiro |
| UC25 | `SUB-02` | [#95](https://github.com/ArenaXVIII/arena-xviii-backend/issues/95) | Definir os contratos de aplicação do registro de movimentação de estoque | Backlog | @LunaRibeiro |
| UC25 | `SUB-03` | [#96](https://github.com/ArenaXVIII/arena-xviii-backend/issues/96) | Implementar o serviço de aplicação do registro de movimentação de estoque | Backlog | @LunaRibeiro |
| UC25 | `SUB-04` | [#97](https://github.com/ArenaXVIII/arena-xviii-backend/issues/97) | Implementar o adaptador de persistência de movimentações | Backlog | @LunaRibeiro |
| UC25 | `SUB-05` | [#98](https://github.com/ArenaXVIII/arena-xviii-backend/issues/98) | Expor o registro de movimentação via API HTTP | Backlog | @LunaRibeiro |
| UC25 | `SUB-06` | [#99](https://github.com/ArenaXVIII/arena-xviii-backend/issues/99) | Implementar os testes de integração ponta a ponta (e2e) do registro de movimentação de estoque | Backlog | @LunaRibeiro |
| UC25 | `SUB-07` | [#100](https://github.com/ArenaXVIII/arena-xviii-backend/issues/100) | Documentar tecnicamente o registro de movimentação | Backlog | @LunaRibeiro |

## 3. Labels criadas

`module:patrocinios`, `module:associados`, `module:esportes`, `module:estoque`, `spec:rascunho`, `uc:UC01`, `uc:UC02`, `uc:UC04`, `uc:UC15`, `uc:UC17`, `uc:UC19`, `uc:UC20`, `uc:UC22`, `uc:UC24`, `uc:UC25` (cores no `README.md`). As labels de tipo, camada e prioridade já existiam (UC03).

## 4. Ocorrências

| Ocorrência | Situação |
|---|---|
| As Issues foram adicionadas automaticamente ao board, mas sem status | Corrigido: as 81 Issues foram posicionadas em `Backlog` |
| Referências `SUB-XX` e `UCnn · SUB-XX` nos corpos | Substituídas pelos números reais; verificação automática não encontrou referências provisórias restantes |
