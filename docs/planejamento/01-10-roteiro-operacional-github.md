# Artefato 10 — Roteiro Operacional de Configuração no GitHub

> Pré-requisito: o projeto `arena-xviii-backend` deve estar publicado em um repositório GitHub. A cópia local analisada não é um repositório Git.

## Passo 1 — Acessar o repositório
1. Acesse `https://github.com/<organização-ou-usuário>/arena-xviii-backend`.
2. Em **Settings → General → Features**, confirme que **Issues** está habilitado.

## Passo 2 — Configurar as labels (antes das Issues)
1. Acesse **Issues → Labels → New label**.
2. Crie as 13 labels do Artefato 7, com nome, cor e descrição.
3. *(Opcional, via GitHub CLI):*
   ```bash
   gh label create "module:eventos" --color 1D76DB --description "Módulo de Eventos"
   gh label create "uc:UC03" --color 5319E7 --description "UC03 — Divulgar Evento"
   gh label create "type:epic" --color 3E4B9E --description "Issue principal de caso de uso"
   gh label create "type:feature" --color 0E8A16 --description "Implementação de funcionalidade"
   gh label create "type:test" --color FBCA04 --description "Testes automatizados de integração/e2e"
   gh label create "type:documentation" --color 0075CA --description "Documentação técnica"
   gh label create "layer:domain" --color C2E0C6 --description "Camada de domínio"
   gh label create "layer:application" --color BFD4F2 --description "Camada de aplicação"
   gh label create "layer:infra" --color D4C5F9 --description "Camada de infraestrutura"
   gh label create "layer:api" --color F9D0C4 --description "Camada de interface HTTP"
   gh label create "priority:high" --color B60205 --description "Prioridade alta"
   gh label create "priority:medium" --color D93F0B --description "Prioridade média"
   gh label create "priority:low" --color E4E669 --description "Prioridade baixa"
   ```

## Passo 3 — Criar a Issue principal (Epic)
1. Acesse **Issues → New issue**.
2. Título: `[UC03] Divulgar Evento`.
3. No corpo, cole o conteúdo do Artefato 3 (`01-03-issue-principal-epic.md`).
4. Salve e anote o número gerado (por exemplo, `#1`).

## Passo 4 — Criar as Sub-Issues
1. Para cada bloco do Artefato 4 (`01-04-sub-issues.md`), crie uma nova Issue com o título `[SUB-XX] ...` e cole a descrição correspondente.
2. Anote o número de cada Issue criada (`SUB-01 → #2`, `SUB-02 → #3` etc.).

## Passo 5 — Vincular as Sub-Issues ao épico
1. Abra o épico e, na barra lateral ou no rodapé, use **Create sub-issue → Add existing issue** para vincular SUB-01 a SUB-07 (recurso nativo de sub-issues do GitHub).
2. Edite o checklist do épico, substituindo os identificadores provisórios pelas referências reais. Exemplo: `- [ ] #2 [SUB-01] Modelar a entidade Evento...`.
3. Em cada Sub-Issue, substitua `SUB-XX` na seção **Dependências** por `#número`.

## Passo 6 — Revisar as descrições e os critérios de aceite
1. Confira se cada Issue contém objetivo, origem, critérios de aceite em checklist (`- [ ]`) e evidências esperadas.
2. Registre no épico, como comentário, as propostas H01–H05 e as dúvidas D01–D04 para deliberação da equipe.

## Passo 7 — Aplicar as labels
Aplique as labels em cada Issue conforme a tabela consolidada do Artefato 7, seção 5.

## Passo 8 — Criar o GitHub Project e configurar os 5 status
1. Acesse **Projects → New project → Board**.
2. Nome: `ARENA XVIII — Implementação`.
3. Em **Settings → Fields → Status**, deixe exatamente: `Backlog`, `Ready`, `In Progress`, `In Review`, `Done`, nesta ordem. Renomeie ou exclua as opções padrão (`Todo` etc.).
4. *(Opcional)* Crie os campos `Camada` e `Caso de Uso` (Artefato 8, seção 1.4).
5. Vincule o Project ao repositório (**Settings → Manage access** ou na aba **Projects** do repositório).

## Passo 9 — Inserir as Issues no Project
1. No board, use **+ Add item** e selecione o épico e as Sub-Issues SUB-01 a SUB-07.
2. Defina o `Status` de cada item conforme o Artefato 8, seção 2 (Epic e SUB-01 em `Ready`; as demais em `Backlog`).

## Passo 10 — Atribuir os responsáveis
Em cada Issue, em **Assignees**, selecione `@LunaRibeiro`.

## Passo 11 — Revisar o board e a rastreabilidade
1. Confira se nenhum item está sem status ou em status fora dos 5 definidos.
2. Compare as Issues com a matriz de rastreabilidade (Artefato 5) e a de dependências (Artefato 6).
3. Execute o checklist de validação (Artefato 11).
