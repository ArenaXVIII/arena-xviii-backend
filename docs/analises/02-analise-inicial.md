# Análise Inicial — Sistema de Gestão de Atlética Universitária

**Disciplina:** Desenvolvimento de Sistemas Corporativos  
**Professor:** Everton Coimbra de Araujo  

**Integrantes:**  
- Adriel Ostrovski
- Bolivar Torres Neto
- Luna Ribeiro

**Tema:** Sistema de Gestão de Atlética Universitária  
**Data:** Não definida

---

# 1. Apresentação do Sistema

O sistema proposto pela equipe é um **Sistema de Gestão de Atlética Universitária**.

A proposta surgiu a partir da percepção de que diversas atividades de uma atlética são realizadas de maneira pouco organizada. Informações importantes acabam ficando espalhadas, algumas atividades não seguem um processo padronizado e nem sempre existe uma definição clara sobre quem é responsável por cada tarefa.

A atlética realiza atividades relacionadas ao controle de associados e atletas, modalidades esportivas, treinos, eventos e campeonatos, mensalidades, movimentações financeiras, patrocínios, materiais esportivos e uniformes. Entretanto, essas atividades nem sempre são executadas de maneira completa ou acompanhadas adequadamente.

O sistema pretende apoiar a organização dessas atividades, principalmente por meio da centralização das informações e de uma melhor definição das responsabilidades envolvidas nos processos da atlética.

Os principais afetados pelo problema são os próprios integrantes da organização. Isso inclui diretoria, responsáveis pelas atividades financeiras, responsáveis esportivos, demais membros da atlética e atletas ou associados.

O objetivo principal da solução é, portanto, **centralizar as informações da atlética e contribuir para uma organização mais clara das responsabilidades de cada função**.

O sistema possui um escopo amplo e não se limita à organização de eventos. Ele também deverá apoiar atividades relacionadas aos associados e atletas, modalidades esportivas, treinos, campeonatos, financeiro, patrocínios, materiais esportivos, uniformes e demais processos administrativos e esportivos da atlética.

Entre os diferentes processos existentes no **Sistema de Gestão de Atlética Universitária**, o fluxo selecionado para análise detalhada neste trabalho foi a **organização de um evento da atlética, desde seu planejamento inicial até o fechamento financeiro**. A escolha desse fluxo tem como objetivo analisar com maior profundidade um processo representativo do sistema, sem limitar as demais funcionalidades que fazem parte da proposta.

---

# 2. Problema e Contexto

Atualmente, a gestão da atlética apresenta problemas relacionados principalmente à organização das informações e das responsabilidades.

Parte das informações utilizadas no dia a dia encontra-se espalhada, dificultando a consulta, o acompanhamento e a continuidade das atividades. Além disso, algumas tarefas são realizadas de maneira informal e sem um processo claramente definido.

Também existem situações em que determinadas atividades deixam de ser realizadas ou são executadas sem que exista um registro adequado do que aconteceu.

Outro problema identificado está relacionado à divisão de responsabilidades. Pessoas com funções diferentes acabam realizando atividades que originalmente não estavam associadas ao seu papel dentro da organização.

Esse cenário afeta praticamente todos os envolvidos na atlética, pois uma atividade realizada por uma pessoa pode depender de informações produzidas ou mantidas por outra.

A existência desses problemas foi percebida por meio de observação, experiência da equipe, conversas com integrantes e relatos relacionados ao funcionamento da atlética. Ao mesmo tempo, a equipe reconhece que nem todas as percepções possuem o mesmo nível de confirmação, motivo pelo qual algumas afirmações ainda são tratadas como hipóteses ou questões em aberto.

---

# 3. Quadro de Conhecimento Atual

Nesta etapa, as informações foram separadas entre **fatos, hipóteses, questões em aberto e decisões**.

Essa classificação é importante para impedir que uma percepção ainda não confirmada seja tratada como uma regra definitiva do sistema.

## 3.1 Fatos identificados

| ID | Tipo | Descrição | Evidência | Estado |
|---|---|---|---|---|
| F01 | Fato | A atlética realiza atividades relacionadas a associados, modalidades, eventos, campeonatos, mensalidades, financeiro, patrocínios, materiais e uniformes. | Conhecimento e experiência da equipe sobre o funcionamento da atlética. | Confirmado |
| F02 | Fato | Existem informações relacionadas às atividades da atlética que ficam espalhadas e não totalmente centralizadas. | Observações, conversas e relatos de integrantes. | Confirmado |
| F03 | Fato | Algumas atividades são realizadas de maneira informal e sem uma padronização completa. | Observações e experiência relatadas pela equipe. | Confirmado |
| F04 | Fato | Algumas atividades podem deixar de ser realizadas ou não possuir acompanhamento adequado. | Observações, conversas e relatos relacionados à rotina da organização. | Confirmado |
| F05 | Fato | Existem situações em que pessoas executam atividades que não correspondem originalmente à função que exercem. | Observação e relatos sobre a divisão atual de responsabilidades. | Confirmado |
| F06 | Fato | Os problemas de organização afetam diferentes pessoas e funções dentro da atlética. | Percepção compartilhada pela equipe durante a análise. | Confirmado |

---

## 3.2 Hipóteses identificadas

Algumas conclusões parecem plausíveis, mas ainda precisam ser verificadas de maneira mais cuidadosa.

| ID | Tipo | Descrição | Como validar | Estado |
|---|---|---|---|---|
| H01 | Hipótese | Centralizar as informações poderá reduzir parte da desorganização atual. | Comparar o processo atual com uma organização centralizada e consultar os envolvidos. | Aberta |
| H02 | Hipótese | Uma definição mais clara das responsabilidades poderá reduzir situações em que pessoas executam atividades fora de sua função. | Levantar formalmente as responsabilidades atuais e conversar com os ocupantes de cada função. | Aberta |
| H03 | Hipótese | A organização de eventos possui mais etapas e dependências do que era percebido inicialmente pela equipe. | Comparar o fluxo analisado com eventos reais já organizados pela atlética. | Aberta |
| H04 | Hipótese | Um controle financeiro confiável depende de registros corretos realizados durante todo o processo do evento. | Analisar eventos anteriores e verificar quais registros foram necessários no fechamento financeiro. | Aberta |
| H05 | Hipótese | A definição incorreta das responsabilidades e das permissões financeiras apresenta risco semelhante para o funcionamento do sistema. | Discutir os dois pontos com os responsáveis reais pelos processos e analisar seus impactos. | Aberta |

---

## 3.3 Questões em aberto

| ID | Tipo | Descrição | Como investigar | Estado |
|---|---|---|---|---|
| Q01 | Questão em aberto | Qual é exatamente a responsabilidade de cada cargo ou função dentro da atlética? | Conversar com a diretoria e com os integrantes que exercem cada função. | Aberta |
| Q02 | Questão em aberto | Quais informações financeiras cada tipo de usuário poderá visualizar ou alterar? | Discutir com a diretoria e principalmente com os responsáveis pelo financeiro. | Aberta |
| Q03 | Questão em aberto | Qual regra determina que o fechamento financeiro de um evento está efetivamente concluído? | Analisar como o fechamento é realizado atualmente e conversar com os responsáveis financeiros. | Aberta |

As três questões possuem impacto importante no entendimento do sistema. As duas primeiras foram consideradas pela equipe como igualmente prioritárias.

---

## 3.4 Decisões identificadas

| ID | Tipo | Descrição | Justificativa | Estado |
|---|---|---|---|---|
| D01 | Decisão | Utilizar a organização de um evento como fluxo principal da análise. | A equipe considera a organização de eventos uma atividade mais representativa para compreender o funcionamento da atlética. | Atual |
| D02 | Decisão | Considerar a diretoria como responsável por iniciar o fluxo de organização do evento. | Corresponde ao funcionamento informado pela equipe durante a análise. | Atual |
| D03 | Decisão | Analisar detalhadamente as operações de planejamento do evento, controle de vendas/inscrições e fechamento financeiro. | São operações importantes em momentos diferentes do fluxo principal. | Atual |
| D04 | Decisão | Não tomar decisões sobre tecnologias ou estrutura técnica nesta etapa. | O objetivo atual é compreender o funcionamento do sistema antes de decidir como ele será construído. | Atual |

---

# 4. Fluxo Principal

## 4.1 Fluxo escolhido

O fluxo escolhido foi:

**Organização de um evento da atlética do início ao fechamento financeiro.**

Esse fluxo foi escolhido por representar uma atividade relevante da organização e por envolver diferentes responsabilidades, informações, decisões e possíveis problemas.

## 4.2 Objetivo do fluxo

O objetivo é permitir que um evento seja planejado, divulgado, acompanhado, realizado e posteriormente encerrado financeiramente.

## 4.3 Quem inicia

O fluxo é iniciado pela **diretoria da atlética**.

## 4.4 Ponto de início

O processo começa quando a diretoria decide que um novo evento será realizado.

## 4.5 Sequência principal

O fluxo compreendido pela equipe é o seguinte:

1. A diretoria decide realizar um evento.
2. A ideia e o tipo do evento são definidos.
3. São definidos o objetivo, a data, o local, o orçamento, os responsáveis e as atrações ou atividades.
4. Depois que essas informações principais estão definidas, o evento pode ser divulgado.
5. Após a divulgação, começam as vendas ou inscrições.
6. Durante esse período, diferentes atividades acontecem paralelamente:
   - acompanhamento das vendas;
   - execução das tarefas atribuídas;
   - pagamentos e contratações necessárias.
7. Antes do evento, a diretoria realiza uma revisão geral.
8. Caso não exista um impedimento, o evento é realizado.
9. Depois do evento, é feito o fechamento financeiro.
10. O resultado financeiro do evento é registrado.

A conclusão do fluxo ocorre quando o evento já aconteceu e as informações financeiras necessárias foram reunidas para o fechamento.

---

# 5. Análise Detalhada das Etapas

| Etapa | Quem age? | Entrada | Saída | Existe decisão? | O que pode impedir? |
|---|---|---|---|---|---|
| Decidir realizar o evento | Diretoria | Necessidade ou ideia de realização de um evento | Início do planejamento | Sim. Decidir se o evento será realizado | A própria decisão de não prosseguir |
| Definir o evento | Diretoria | Ideia ou tipo de evento | Evento com definição inicial | Sim. Escolha do formato e objetivo | Falta de condições para prosseguir |
| Planejar | Diretoria e responsáveis definidos | Tipo do evento | Data, local, orçamento, responsáveis e atrações definidos | Sim | Principalmente indisponibilidade do local |
| Divulgar | Responsáveis pelo evento | Informações principais do evento | Evento divulgado | Sim. A divulgação depende das definições anteriores | Informações principais ainda não definidas |
| Iniciar vendas/inscrições | Participantes e organização | Dados do evento e informações necessárias à venda/inscrição | Vendas ou inscrições registradas | Sim | Dados incorretos ou pagamento não realizado |
| Acompanhar organização | Diretoria e responsáveis | Situação das vendas, tarefas, pagamentos e contratações | Atualização do andamento do evento | Sim | Pendências ou problemas durante a organização |
| Revisar o evento | Diretoria | Situação geral da organização | Confirmação de que o evento pode seguir | Sim | Problemas que inviabilizem a realização |
| Realizar o evento | Equipe responsável | Planejamento concluído | Evento realizado | Pode haver decisões durante a execução | Problemas graves que impeçam sua realização |
| Realizar fechamento financeiro | Responsáveis financeiros | Receitas, despesas, pagamentos e demais valores registrados | Resultado financeiro e relatório do evento | Sim | Dados incompletos ou pagamentos pendentes |

O fluxo mostra que algumas atividades possuem dependência direta das anteriores. Por exemplo, a divulgação depende da definição das informações principais do evento.

Ao mesmo tempo, depois do início das vendas, algumas atividades deixam de acontecer de forma totalmente sequencial e passam a ocorrer paralelamente.

---

# 6. Caminho Principal, Variações e Falhas

## 6.1 Caminho principal

No caminho esperado, a diretoria decide realizar o evento, define as informações necessárias, realiza a divulgação, inicia as vendas, acompanha a organização, faz uma revisão geral e realiza o evento.

Depois da realização, ocorre o fechamento financeiro.

De maneira resumida:

**Decisão de realizar → Planejamento → Divulgação → Vendas/inscrições → Organização e acompanhamento → Revisão → Realização → Fechamento financeiro**

---

## 6.2 Variação de negócio

Uma variação identificada está relacionada ao **clima ou ao local do evento**.

Caso as condições climáticas sejam desfavoráveis ou apareça um problema relevante relacionado ao local, a diretoria pode decidir **alterar a data do evento**.

Nesse caso, o fluxo não termina necessariamente em falha. Ele retorna para uma etapa anterior de planejamento, na qual a nova data precisa ser definida.

Fluxo da variação:

**Problema com clima/local → decisão da diretoria → alteração da data → atualização do planejamento → continuidade da organização**

---

## 6.3 Situações de falha

Durante a análise, foram identificadas situações que podem impedir a continuidade normal do evento:

- orçamento insuficiente;
- problema grave relacionado ao local;
- quantidade insuficiente de vendas ou inscrições;
- cancelamento de fornecedor;
- cancelamento de atração.

Dependendo da gravidade do problema, o evento pode precisar ser remarcado ou cancelado.

Nessas situações, o sistema deve permitir que a diretoria identifique o problema, registre o motivo e mantenha a informação sobre a alteração realizada.

---

# 7. Operações Identificadas

A partir do fluxo principal, foram identificadas as seguintes operações necessárias:

1. **Criar o evento**
2. **Definir data, local, orçamento e responsáveis**
3. **Divulgar o evento**
4. **Controlar vendas ou inscrições**
5. **Registrar despesas e pagamentos**
6. **Acompanhar tarefas dos responsáveis**
7. **Remarcar ou cancelar o evento**
8. **Realizar o fechamento financeiro**

Essas operações não foram escolhidas de forma isolada. Cada uma aparece porque existe uma etapa correspondente dentro do fluxo de organização do evento.

---

# 8. Detalhamento de Três Operações

## 8.1 Operação — Criar e Planejar o Evento

| Campo | Descrição |
|---|---|
| **Nome** | Criar e planejar o evento |
| **Objetivo** | Transformar uma ideia inicial em um evento suficientemente planejado para que a organização possa avançar. |
| **Entrada** | Ideia ou tipo do evento. |
| **Processamento** | A diretoria define data, local, orçamento, responsáveis e atrações ou atividades. |
| **Saída** | Evento planejado e preparado para a etapa de divulgação. |
| **Regra/condição** | As principais informações do evento precisam estar definidas antes da divulgação oficial. |
| **Possível impedimento** | Indisponibilidade do local. |

---

## 8.2 Operação — Controlar Vendas ou Inscrições

| Campo | Descrição |
|---|---|
| **Nome** | Controlar vendas ou inscrições |
| **Objetivo** | Registrar e acompanhar as vendas ou inscrições relacionadas ao evento. |
| **Entrada** | Dados do participante ou comprador, quantidade de ingressos e informações relacionadas ao pagamento. |
| **Processamento** | Conferir disponibilidade, registrar a venda ou inscrição, atualizar a quantidade vendida e registrar o pagamento. |
| **Saída** | Confirmação da venda ou inscrição. |
| **Regra/condição** | A venda ou inscrição somente pode ser confirmada quando as informações necessárias estiverem corretas e a operação puder ser concluída. |
| **Possível impedimento** | Pagamento não realizado ou dados incorretos. |

---

## 8.3 Operação — Realizar o Fechamento Financeiro

| Campo | Descrição |
|---|---|
| **Nome** | Realizar o fechamento financeiro |
| **Objetivo** | Apurar o resultado financeiro final do evento. |
| **Entrada** | Total de vendas, despesas, pagamentos realizados e patrocínios ou outras receitas. |
| **Processamento** | Somar receitas, somar despesas, comparar entradas e saídas e calcular o resultado final. |
| **Saída** | Resultado de lucro ou prejuízo e relatório financeiro do evento. |
| **Regra/condição** | A regra exata que determina quando o fechamento pode ser considerado concluído ainda precisa ser investigada. |
| **Possível impedimento** | Despesas não registradas, pagamentos pendentes ou informações financeiras incompletas. |

A terceira operação demonstra um ponto em que a equipe preferiu manter uma questão em aberto em vez de criar uma regra que ainda não foi confirmada.

---

# 9. Informações Necessárias ao Sistema

A análise do fluxo permitiu identificar quais informações precisam ser conhecidas ou preservadas para que o processo possa acontecer e ser consultado posteriormente.

Neste momento, essas informações representam conceitos importantes para o negócio. Não estão sendo definidas tabelas, classes ou estruturas técnicas.

| Informação | Por que precisa existir? |
|---|---|
| **Evento** | É necessário manter a identificação da atividade que está sendo organizada. |
| **Tipo e objetivo do evento** | Permitem compreender qual atividade está sendo planejada e sua finalidade. |
| **Data** | É necessária para organizar a realização e permitir possíveis remarcações. |
| **Local** | É necessário para definir onde o evento ocorrerá e acompanhar possíveis mudanças. |
| **Responsáveis** | Permitem saber quem ficou encarregado das atividades relacionadas ao evento. |
| **Orçamento** | É necessário para acompanhar os valores previstos para a realização do evento. |
| **Vendas ou inscrições** | Precisam ser preservadas para acompanhar a participação e a movimentação relacionada ao evento. |
| **Participantes ou compradores** | São necessários para identificar as pessoas relacionadas às vendas ou inscrições. |
| **Pagamentos** | Precisam ser registrados para permitir o acompanhamento financeiro. |
| **Despesas** | São necessárias para saber quanto foi gasto durante a organização e realização. |
| **Patrocínios e outras receitas** | Precisam ser conhecidos para compor corretamente as entradas financeiras do evento. |
| **Resultado financeiro** | Permite conhecer o resultado final depois da comparação entre receitas e despesas. |
| **Histórico de alterações** | É necessário para preservar informações sobre remarcações, cancelamentos e outras mudanças relevantes. |

Essas informações surgem diretamente das necessidades observadas no fluxo e nas operações analisadas.

---

# 10. Questões e Hipóteses Ainda Abertas

Ao retornar ao quadro inicial, a equipe percebeu que ainda existem pontos que não podem ser considerados totalmente resolvidos.

## 10.1 Hipóteses que continuam abertas

A hipótese de que a simples centralização das informações será suficiente para melhorar significativamente a organização ainda precisa ser validada.

Também continua aberta a hipótese de que uma definição mais clara das responsabilidades reduzirá as situações em que pessoas realizam atividades fora de sua função.

A importância dos registros financeiros ao longo de todo o evento também foi reforçada durante a análise, mas ainda precisa ser confrontada com eventos reais e com a forma atual de trabalho da atlética.

Nenhuma dessas hipóteses deve ser tratada como regra definitiva antes de uma validação mais cuidadosa.

---

## 10.2 Questões que ainda precisam ser respondidas

As principais questões são:

1. Qual é exatamente a responsabilidade de cada cargo dentro da atlética?
2. Quais informações financeiras cada tipo de usuário poderá visualizar ou alterar?
3. Qual é a condição utilizada atualmente para considerar o fechamento financeiro de um evento concluído?

As duas primeiras foram consideradas pela equipe como possuindo a mesma prioridade.

---

## 10.3 Parte do fluxo com maior incerteza

As partes que exigiram mais discussão foram:

- divisão das responsabilidades;
- controle financeiro;
- situações de remarcação ou cancelamento.

Essas áreas possuem condições que ainda não estão totalmente definidas.

---

## 10.4 Decisões que podem precisar ser revistas

As decisões relacionadas ao fluxo poderão ser refinadas conforme a equipe obtiver informações mais precisas sobre o funcionamento real da atlética.

Principalmente a divisão das responsabilidades e as regras relacionadas às informações financeiras poderão provocar alterações futuras no entendimento do sistema.

---

## 10.5 Decisões técnicas

A equipe decidiu **não tomar decisões técnicas nesta etapa**.

Não foram definidos linguagem de programação, framework, banco de dados, estrutura de API, arquitetura ou qualquer outra tecnologia de implementação.

Essas decisões somente deverão ser discutidas quando houver compreensão suficiente do domínio e quando a etapa correspondente da disciplina for iniciada.

---

# 11. Reflexão da Equipe

## 11.1 O que ficou mais claro durante a análise?

Durante a análise, a equipe percebeu que o principal problema não está simplesmente na ausência de funcionalidades.

A organização interna dos processos e das responsabilidades possui grande importância para o sistema.

Também ficou mais claro que a organização de um evento envolve uma quantidade maior de etapas e dependências do que parecia inicialmente.

Outro ponto percebido foi que o fechamento financeiro não pode ser analisado isoladamente. Ele depende da qualidade das informações registradas durante todo o processo do evento.

---

## 11.2 Qual hipótese apresenta maior risco?

A equipe considera que dois pontos possuem risco semelhante.

O primeiro é a divisão das responsabilidades. Caso essa divisão seja compreendida de maneira incorreta, o sistema poderá manter justamente parte da desorganização que pretende reduzir.

O segundo é a definição de quem poderá visualizar ou alterar informações financeiras. Uma compreensão incorreta desse ponto pode gerar problemas relacionados ao controle e à responsabilidade sobre as informações.

---

## 11.3 Qual questão precisa ser investigada com maior prioridade?

A equipe considera que duas questões possuem a mesma prioridade:

- definir corretamente as responsabilidades de cada função;
- definir quem poderá visualizar ou alterar as informações financeiras.

Esses pontos deverão receber atenção especial antes que sejam transformados em regras definitivas.

---

## 11.4 Qual parte do fluxo exigiu mais discussão?

As partes que exigiram mais discussão foram:

- divisão de responsabilidades;
- controle financeiro;
- remarcação ou cancelamento de eventos.

Essas partes apresentam diferentes condições e envolvem decisões importantes durante o funcionamento do evento.

---

## 11.5 Alguma ideia inicial precisou ser revista?

Sim.

Inicialmente, o problema poderia ser observado principalmente como uma necessidade de adicionar funcionalidades para controlar as atividades da atlética.

Durante a análise, ficou mais claro que simplesmente criar funcionalidades não resolve o problema se os processos e responsabilidades continuarem desorganizados.

Também foi revista a percepção sobre o fluxo de organização de eventos. O processo mostrou possuir mais etapas, dependências e situações alternativas do que parecia inicialmente.

---

## 11.6 O que este trabalho mudou na forma de pensar o sistema?

A análise fez com que a equipe deixasse de observar o sistema apenas como uma lista de funcionalidades.

Passou a ser necessário pensar em como as atividades realmente acontecem, quais informações cada etapa precisa, quem é responsável, quais decisões podem alterar o fluxo e quais situações podem impedir sua continuidade.

Esse entendimento permite discutir futuramente a estrutura do sistema com uma base mais clara sobre o problema que precisa ser resolvido.

---

## 11.7 A equipe está preparada para avançar?

A equipe considera que **sim**, mas reconhece que ainda existem questões que precisam ser esclarecidas durante as próximas etapas.

Principalmente a divisão exata das responsabilidades e as permissões relacionadas às informações financeiras ainda precisam ser investigadas.

Mesmo assim, o fluxo principal, suas operações e as informações necessárias já apresentam uma base suficiente para que a equipe avance para a próxima etapa mantendo essas questões registradas.

### Avaliação da maturidade da análise

**MADURA PARA AVANÇAR À MODELAGEM DE DOMÍNIO**

A classificação não significa que todas as dúvidas foram resolvidas. Ela indica que já existe uma compreensão suficiente do problema, do fluxo principal, das operações e das principais informações necessárias para continuar a análise.

As questões em aberto deverão permanecer visíveis e ser revisitadas conforme novas informações forem obtidas.

---

# 12. Recomendações para a Equipe

Antes e durante a próxima etapa, a equipe deverá:

1. Investigar com maior precisão a divisão de responsabilidades entre os cargos da atlética.
2. Definir com os responsáveis quais informações financeiras precisam ser acessadas por cada função.
3. Verificar como os eventos realizados anteriormente foram organizados para comparar o fluxo real com o fluxo identificado neste trabalho.
4. Investigar qual procedimento é utilizado para considerar o fechamento financeiro de um evento concluído.
5. Revisar as hipóteses registradas sempre que novas informações sobre o funcionamento da atlética forem obtidas.

---

# Apêndice — Uso de Inteligência Artificial

## Ferramenta Utilizada

Foi utilizado o **ChatGPT** como ferramenta de apoio durante a análise.

---

## Finalidade do Uso

A Inteligência Artificial foi utilizada como apoio ao processo de investigação do sistema.

A interação ocorreu principalmente por meio de perguntas progressivas sobre o problema, pessoas afetadas, objetivo, fluxo principal, variações, falhas, operações e informações necessárias.

A ferramenta não foi utilizada para definir tecnologias de implementação ou tomar decisões técnicas sobre o sistema.

As respostas relacionadas ao funcionamento da atlética foram fornecidas pela equipe durante a conversa.

---

## Principais Contribuições

Entre as principais contribuições da ferramenta estiveram:

- ajudar a separar aquilo que poderia ser considerado fato daquilo que ainda precisava ser tratado como hipótese;
- fazer perguntas sobre o problema atual da atlética;
- auxiliar na escolha de um fluxo principal representativo;
- questionar a ordem e as dependências das etapas de organização de um evento;
- levantar possíveis situações de variação e falha;
- ajudar a relacionar operações diretamente ao fluxo discutido;
- destacar questões que ainda precisavam permanecer em aberto.

---

## Hipóteses que a IA Ajudou a Revelar

Durante a conversa, ficou mais claro que algumas ideias que poderiam inicialmente parecer evidentes ainda precisam ser validadas.

Entre elas estão:

- a expectativa de que centralizar as informações reduzirá a desorganização;
- a expectativa de que uma melhor definição das responsabilidades reduzirá atividades executadas por pessoas de outras funções;
- a percepção de que o controle financeiro depende de registros adequados ao longo de todo o evento.

Esses pontos foram mantidos como hipóteses justamente por não possuírem validação suficiente para serem considerados regras definitivas.

---

## Questões Novas que Surgiram

A interação contribuiu para tornar mais explícitas questões como:

- qual é exatamente a responsabilidade de cada cargo;
- quais informações financeiras cada função poderá visualizar ou alterar;
- qual condição deve ser atendida para considerar o fechamento financeiro concluído.

Essas questões permanecem abertas para investigação.

---

## Decisões que Foram Revistas

Uma das principais mudanças de entendimento foi perceber que o sistema não deve ser analisado apenas como um conjunto de funcionalidades.

A equipe passou a considerar também a organização dos processos, responsabilidades e dependências entre as atividades.

Outra percepção revista foi a complexidade da organização de eventos. O processo mostrou envolver planejamento, divulgação, vendas, tarefas paralelas, revisão, possíveis imprevistos, realização e fechamento financeiro.

---

## Sugestões da IA que Foram Rejeitadas

Durante a escolha do fluxo principal, também foi considerada a possibilidade de utilizar a **participação da atlética em um campeonato**.

A equipe decidiu não utilizar esse fluxo como principal porque considera que a **organização de um evento do início ao fim** representa melhor a atividade que deseja analisar neste momento.

Essa decisão foi tomada pela equipe durante a conversa e não pela ferramenta.

---

## Avaliação Crítica do Uso da IA

A ferramenta foi útil principalmente para organizar as perguntas e fazer com que a equipe refletisse sobre pontos que poderiam passar despercebidos.

Uma limitação observada é que a Inteligência Artificial pode apresentar alternativas plausíveis mesmo quando não possui evidências sobre a realidade específica da atlética.

Por esse motivo, as alternativas apresentadas foram avaliadas pela equipe durante a conversa antes de serem aceitas.

Em diversos momentos, a ferramenta apresentou opções de resposta e a equipe decidiu quais correspondiam melhor à realidade considerada.

Quando existia informação insuficiente, o ponto foi mantido como hipótese ou questão em aberto em vez de ser transformado em uma regra definitiva.

---

## Questão Final Obrigatória

**Se a Inteligência Artificial fosse retirada agora, a equipe conseguiria explicar, justificar e defender todas as partes do trabalho?**

Sim.

O conteúdo foi construído a partir das respostas dadas pela equipe durante a análise. A Inteligência Artificial foi utilizada principalmente para conduzir as perguntas, organizar as informações e apontar pontos que precisavam de maior reflexão.

As decisões sobre o problema, fluxo principal, variações, operações e questões em aberto foram avaliadas e respondidas pela própria equipe.

Por isso, mesmo sem a ferramenta, a equipe possui condições de explicar o problema identificado, justificar o fluxo analisado e reconhecer quais pontos ainda precisam ser investigados antes de serem tratados como definitivos.