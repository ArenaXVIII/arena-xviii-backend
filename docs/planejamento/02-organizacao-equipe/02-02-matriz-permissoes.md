# 02-02 - Matriz de Permissões do GitHub

## 1. Fonte e contexto

- Os artefatos anteriores identificam o caso de uso **UC03 — Divulgar Evento** e registram **@LunaRibeiro** como responsável principal do slice.
- A equipe real do projeto é composta por **Adriel Ostrovski**, **Bolivar Torres Neto** e **Luna Ribeiro**.
- Os nomes de usuário do GitHub dos dois primeiros integrantes não aparecem no material do repositório; por isso, a recomendação abaixo usa **"A definir"** para o nome de usuário, sem inventar nomes ou credenciais.

> Esta matriz é uma recomendação de governança. Ela não altera permissões reais no GitHub sem ação dos administradores do repositório.

## 2. Níveis formais de permissão do repositório

- `Read`: leitura e acompanhamento.
- `Triage`: gestão e revisão de Issues/Discussions sem permissão de push direto em código.
- `Write`: desenvolvimento diário, criação de branches e abertura de Pull Requests.
- `Maintain`: gestão de branches protegidas, automações e configurações sem acesso administrativo completo.
- `Admin`: configurações avançadas, permissões de membros e exclusão do repositório.

## 3. Matriz recomendada

| Integrante | Papel funcional | Operações práticas esperadas | Permissão recomendada no repositório | Nível no GitHub Project | Justificativa técnica e de segurança |
|---|---|---|---|---|---|
| Adriel Ostrovski | Desenvolvedor/Revisor | Criar branches, abrir PRs, revisar Issues, consultar board e participar da revisão de planejamento | `Write` | `Write` (edição do board e movimentação de itens) | Permite execução diária sem conceder direitos de configuração geral; segue o princípio do menor privilégio |
| Bolivar Torres Neto | Desenvolvedor/Revisor | Implementar Sub-Issues, apoiar testes e e2e, comentar em Issues e mover status no board | `Write` | `Write` | Necessário para o desenvolvimento mas não exige acesso administrativo ao repositório |
| Luna Ribeiro | Coordenador / Responsável Técnico | Conduzir o epic, revisar dependências, orientar decisões, aprovar PRs do slice, manter board atualizado | `Write` (ou `Maintain`, somente se a equipe formalizar a necessidade de governança) | `Write` | Necessária para a execução do trabalho, com revisão cruzada; a atribuição administrativa deve ser excepcional e justificada |

## 4. Observações de segurança

- O nível de permissão **não deve ser superior ao necessário** para a execução da atividade.
- O papel funcional e a autorização do GitHub são conceitos diferentes: uma pessoa pode ter papel de coordenação sem possuir `Admin`.
- O projeto deve manter, no mínimo, **um único responsável pelo repositório** com autoridade para definir regras de governança e revisões finais de acesso.
- Para o contexto acadêmico do slice atual, `Write` para os envolvidos e **sem `Admin` automático** é a recomendação mais segura e compatível com o princípio do menor privilégio.

## 5. Recomendações finais

1. Manter os três membros com acesso de desenvolvimento (`Write`) para o UC03.
2. Não atribuir `Admin` aos coordenadores ou responsáveis técnicos sem justificativa operacional explícita.
3. Usar o GitHub Project para rastrear o estado das Issues; não criar labels de status (`status:ready`, etc.) para substituir o campo `Status` do board.
4. Registrar no README ou em um ponto de governança a decisão final sobre quem será o administrador formal do repositório.
