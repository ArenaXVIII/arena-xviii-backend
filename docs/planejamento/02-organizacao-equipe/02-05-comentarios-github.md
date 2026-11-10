# 02-05 - Comentários Técnicos para o GitHub

## 1. Observação geral

Os comentários abaixo têm o objetivo de servir como base para publicação nas respectivas Issues do GitHub, preservando a rastreabilidade do caso de uso e a diferença entre **pré-análise da IA** e **revisão humana**.

---

### [SUB-01] Modelar a entidade Evento e a transição de divulgação

**Revisor:** @AdrielOstrovski  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Regras de domínio e transição Planejado → Divulgado;
- Critérios de aceite da entidade e de tratamento do erro;
- Ordem de verificação e invariantes do ciclo de vida.

**Problemas e lacunas detectadas:**
- Necessário registrar oficialmente as decisões `D01` (orçamento zero) e `D02` (data no passado) antes do início da implementação.
- O texto da Issue exige uma confirmação explícita sobre como a regra RN01 deve se comportar quando algum campo obrigatório estiver ausente.

**Ajustes recomendados:**
- Inserir, no corpo da Issue ou em comentário, a decisão sobre `D01` e `D02`.
- Manter a ordem de verificação exatamente como definida: existência → já divulgado → Planejado → RN01.

**Condição para Ready:**
- A decisão técnica estiver documentada e a revisão humana aprovar a regra de domínio sem ressalvas.

---

### [SUB-02] Definir os contratos de aplicação (porta de repositório e DTO de resposta)

**Revisor:** @BolivarTorresNeto  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Contrato da porta `IEventsRepository`;
- DTO de resposta `PublishEventResponseDto`;
- Exceção de evento não encontrado e contrato de erro de persistência.

**Problemas e lacunas detectadas:**
- O contrato está coerente, mas deve ser validado em conjunto com a implementação da entidade e com a decisão de erro de persistência.

**Ajustes recomendados:**
- Confirmar assinatura final dos métodos `findEventById` e `save`.
- Validar se `PublishEventResponseDto` atende à resposta esperada pela rota HTTP.

**Condição para Ready:**
- A assinatura e a estrutura do DTO forem aprovadas e o revisor confirmar a consistência entre domínio e aplicação.

---

### [SUB-03] Implementar o serviço de aplicação de divulgação

**Revisor:** @BolivarTorresNeto  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Orquestração do serviço;
- Tratamento de FA01–FA04 e FE01;
- Persistência condicionada ao sucesso.

**Problemas e lacunas detectadas:**
- A lógica do serviço está consistente com a rastreabilidade da Issue, mas sua implementação deve manter a ordem de validações da entidade e nenhum `save` em casos de rejeição.

**Ajustes recomendados:**
- Incluir verificação explícita de que `save` não é chamado em falhas de domínio.
- Confirmar o contrato de resposta e a política de erro de persistência antes do fechamento do PR.

**Condição para Ready:**
- O serviço seguir exatamente o fluxo de sucesso e falha e a revisão humana aprovar o tratamento de erros.

---

### [SUB-04] Implementar o adaptador de persistência de eventos

**Revisor:** @AdrielOstrovski  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Implementação do repositório em memória;
- Isolamento do estado e suporte a testes e2e;
- Dependência de H03.

**Problemas e lacunas detectadas:**
- A proposta técnica H03 é apropriada para a fase inicial, mas precisa ser formalizada como decisão de projeto e não como suposição implícita.

**Ajustes recomendados:**
- Documentar explicitamente que o repositório em memória é uma solução inicial e pode ser substituído futuramente sem mexer no domínio nem na aplicação.

**Condição para Ready:**
- A decisão H03 estiver registrada e a revisão humana aprovar a estratégia de persistência inicial.

---

### [SUB-05] Expor a divulgação via API HTTP e registrar o módulo de eventos

**Revisor:** @LunaRibeiro  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Contrato HTTP;
- Mapeamento da rota de divulgação;
- Tratamento dos códigos de resposta e mensagens de erro.

**Problemas e lacunas detectadas:**
- A atividade depende diretamente de H01 e H02, que precisam ser confirmados pela equipe antes da implementação.
- O código HTTP, o payload e a resposta retornada pela API devem ser consistentes com o contrato de aplicação.

**Ajustes recomendados:**
- Registrar as decisões H01 e H02 no comentário da Issue.
- Confirmar a resposta do endpoint em cenários de sucesso e falha.

**Condição para Ready:**
- A API estiver alinhada com o serviço e com a revisão humana do contrato de resposta.

---

### [SUB-06] Implementar os testes de integração ponta a ponta (e2e) do slice

**Revisor:** @LunaRibeiro  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Jogos de teste para sucesso e falha;
- Verificação do estado persistido;
- Coerência com a matriz de rastreabilidade.

**Problemas e lacunas detectadas:**
- O escopo está bem definido, mas a equipe deve confirmar que todos os cenários documentados são rastreáveis e reproduzíveis.

**Ajustes recomendados:**
- Garantir que a suíte e2e cubra `FA01`, `FA02`, `FA03`, `FA04` e `FE01` sem comprometer o escopo.

**Condição para Ready:**
- Os testes e2e estiverem aprovados e a revisão humana confirmar que cobrem os fluxos críticos da funcionalidade.

---

### [SUB-07] Documentar tecnicamente o primeiro slice

**Revisor:** @AdrielOstrovski  
**Status:** Pré-análise técnica concluída; aguardando validação humana

**Elementos avaliados:**
- Documentação técnica;
- Evidências do slice; 
- Atualização da documentação final do UC03.

**Problemas e lacunas detectadas:**
- A documentação deve ser concluída somente após a validação do endpoint e dos testes e2e.

**Ajustes recomendados:**
- Redigir a documentação após os testes finais do slice e registrar as evidências de execução.

**Condição para Ready:**
- A documentação estiver alinhada com o comportamento validado e o revisor confirmar sua consistência.

---

## 2. Template padrão de conclusão de revisão

```markdown
### 📋 Registro de Revisão de Planejamento

**Revisor:** @[usuario_github]
**Issue:** [SUB-XX] - [Título da Sub-Issue]
**Data da Revisão:** [DD/MM/AAAA]
**Resultado:** [ ] Aprovada sem ressalvas | [ ] Aprovada com ajustes menores | [ ] Ajustes necessários solicitados

**Observações Técnicas:**
- [Registro dos pontos verificados na especificação e critérios de aceite]

**Ajustes Solicitados:**
- [Ajustes que o responsável pela Issue precisa aplicar no texto/critérios, se houver]

**Conclusão e Prontidão:**
- [Indicação se a Issue está liberada para o estado 'Ready' ou deve aguardar ajustes em 'Backlog']
```

## 3. Encaminhamento final

- O conteúdo acima deve ser copiado para a Issue correspondente no GitHub.
- A revisão humana é **obrigatória** antes da promoção da Sub-Issue para `Ready`.
- Este material **não substitui** o registro de aprovação do aluno revisor no GitHub.
