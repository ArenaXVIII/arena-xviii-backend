# 05-06 — Análise preliminar de qualidade

## Pontos fortes

- separação clara entre controller, service e repositório em memória;
- uso do `AppModule` para registrar a rota corretamente;
- resposta padronizada e sem lógica de negócio acoplada ao HTTP;
- o fluxo é pequeno e fácil de seguir, atendendo ao objetivo do GREEN.

## Débitos técnicos e riscos

1. **Persistência em memória:** não é uma solução de produção; serve apenas para o teste atual.
2. **Validação de domínio limitada:** a regra de nome vazio é validada apenas na borda da API, não na entidade.
3. **Falta de testes específicos para falha de nome vazio:** o comportamento de `422` só foi implementado no controller, sem cenário formal de teste de API.
4. **Estrutura de DTOs e respostas ainda em evolução:** é preciso padronizar as mensagens e contratos na próxima etapa.

## Backlog priorizado para REFACTOR

- explorar a criação de `Event.create(name)` com validação de domínio real;
- consolidar DTOs e exceções de erro para os fluxos de cadastro e persistência;
- extrair a persistência para um adaptador concreto;
- incluir testes de borda para nome ausente e eventos inválidos.

## Conclusão

A solução atual é correta para o GREEN, mas ainda apresenta limitações de persistência e domínio que devem ser tratadas no Material 06.
