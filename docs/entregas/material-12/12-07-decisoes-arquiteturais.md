# 12-07 - Decisoes arquiteturais

## DA-01 - Manter separacao HTTP, aplicacao e infraestrutura

- Problema: nenhum problema ativo.
- Evidencia: Controllers delegam ao Service; Service usa contrato de Repository; adaptador implementa infraestrutura.
- Alternativas: combinar camadas ou manter separacao.
- Decisao: manter separacao atual.
- Consequencias: boa testabilidade e baixo acoplamento.
- Verificacao: build, lint, testes e API containerizada passaram.

## DA-02 - Manter mappers HTTP separados do mapper de persistencia

- Problema: hipotetico risco de vazamento ou mistura de responsabilidades.
- Evidencia: os dois mappers HTTP filtram campos publicos; `EventMapper` realiza conversao ORM.
- Alternativas: serializar diretamente ou manter mappers separados.
- Decisao: manter mappers separados.
- Consequencias: controle explicito da resposta publica.
- Verificacao: testes fechados com propriedade interna simulada e requisicao real.

## DA-03 - Cenário B

- Problema: nao foi identificado problema arquitetural ativo que justifique alteracao.
- Evidencia: responsabilidades, providers, contratos e testes estao coerentes.
- Alternativas: refatorar, adiar ou preservar.
- Decisao: preservar.
- Consequencias: nenhum risco novo; uma segunda implementacao em memoria permanece registrada como dívida de baixa prioridade.
- Verificacao: regressao executada sem falhas.

## Validacao pos-atividade

As tres decisoes DA-01, DA-02 e DA-03 foram validadas sem alteracao de codigo. Os testes permaneceram identicos, os contratos HTTP foram observados novamente e os providers continuaram resolvidos.
