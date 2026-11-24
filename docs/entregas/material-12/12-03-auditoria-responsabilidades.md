# 12-03 - Auditoria de responsabilidades

## Matriz de auditoria

| Componente | Responsabilidade esperada | Resultado |
|---|---|---|
| Controllers | Receber HTTP e delegar | Adequado |
| DTO de entrada | Validar entrada | Adequado |
| DTO de resposta | Definir contrato publico | Adequado |
| Mapper HTTP | Selecionar campos publicos | Adequado |
| EventsService | Coordenar caso de uso | Adequado |
| IEventsRepository | Definir persistencia abstrata | Adequado |
| Adaptadores | Persistir ou testar | Adequado |
| Mapper de persistencia | Converter dominio e ORM | Adequado |
| Entidade ORM | Mapear o banco | Adequado |
| Modulos | Compor providers | Adequado |

## Criterios auditados

### 1. Separacao de responsabilidades

Confirmada. Dominio, aplicacao, persistencia e interface possuem arquivos distintos. O Service nao usa TypeORM diretamente.

### 2. Acoplamento

O Service depende da interface `IEventsRepository`, enquanto o modulo decide o adaptador concreto. Essa direcao reduz acoplamento.

### 3. Coesao

As classes concentram responsabilidades coerentes. Os mappers fazem apenas conversao.

### 4. Duplicacao

Foi encontrada uma segunda implementacao em memoria em `src/modules/events/repositories/events.repository.memory.ts`.

- Evidencia: ela nao aparece em importacoes, provider, testes ou modulo.
- Risco: pode haver desvio futuro se outra parte escolher a implementacao duplicada.
- Impacto observado: nenhum na arquitetura ou testes atuais.
- Conclusao: nao constitui problema ativo demonstravel; por isso nao justifica remocao nesta auditoria.

### 5. Legibilidade

Adequada. Nomes e organizacao correspondem aos conceitos do projeto.

### 6. Testabilidade

Adequada. Provider por token permite testes unitarios e substituicao por repositorio em memoria.

### 7. Estabilidade dos contratos

Adequada. Assinaturas do Service, Repository e mappers HTTP permanecem compatíveis com o Material 11.

### 8. Configuracao e composicao

Adequada. A composicao usa `useExisting` com o token, e a escolha entre adaptadores depende de `NODE_ENV=test`.

## Hipoteses descartadas

- Controller acessando ORM diretamente: inexistente.
- Service dependendo de TypeORM: inexistente.
- Repository abstrato expondo tipos ORM: inexistente.
- Duplicacao ativa dos mappers HTTP: inexistente.
- Providers inconsistentes: nao encontrados.

## Limitacoes

A auditoria nao executou testes E2E legados nem declarou qualidade absoluta da aplicacao.

## Evidencia final da verificacao pos-atividade

- Os oito criterios continuam sem problema confirmado.
- Nenhuma refatoracao artificial foi aplicada.
- Os diffs relativos ao estado da auditoria nao introduziram alteracao em dominio, Service, Repository ou mapper de persistencia.
- A implementacao em memoria alternativa continua nao utilizada.
