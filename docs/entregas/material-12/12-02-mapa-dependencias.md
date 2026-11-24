# 12-02 - Mapa de dependencias

## Fluxo de execucao

Cadastro:

```text
Cliente HTTP -> CreateEventsController -> EventsService -> IEventsRepository
             -> adaptador TypeORM ou em memoria -> persistencia
             -> CreateEventResponseDto -> mapper HTTP -> resposta JSON
```

Divulgacao:

```text
Cliente HTTP -> EventsController -> EventsService -> Event.publish()
             -> IEventsRepository.save() -> adaptador -> persistencia
             -> PublishEventResponseDto -> mapper HTTP -> resposta JSON
```

Com PostgreSQL de producao/desenvolvimento, o adaptador concreto esta no fluxo entre a porta de repositorio e TypeORM.

## Dependencias arquiteturais

```text
Controllers -> EventsService -> IEventsRepository
                                  ^
                                  |
                  TypeOrmEventsRepository -> TypeORM -> PostgreSQL
                  InMemoryEventsRepository
```

- O Service depende da interface e nao de uma implementacao concreta.
- `TypeOrmEventsRepository` implementa a interface e injeta `Repository<EventOrmEntity>`.
- `InMemoryEventsRepository` implementa a interface para testes com `NODE_ENV=test`.
- O Controller usa os metodos existentes do Service sem alterar suas assinaturas.

## Composicao de providers

Em `EventsModule`:

- Fora de testes: `TypeOrmEventsRepository` fornece `EVENTS_REPOSITORY`.
- Em `NODE_ENV=test`: `InMemoryEventsRepository` fornece `EVENTS_REPOSITORY`.
- `TypeOrmModule.forFeature([EventOrmEntity])` existe apenas fora do ambiente de teste.
- `AppModule` registra `TypeOrmModule.forRootAsync` fora de testes e registra `EventsModule`.

## Mapeadores

| Mapper | Responsabilidade |
|---|---|
| `create-event-response.mapper.ts` | DTO interno de cadastro -> representacao publica |
| `publish-event-response.mapper.ts` | DTO interno de divulgacao -> representacao publica |
| `EventMapper` | `Event` <-> `EventOrmEntity`, persistencia |

Os dois tipos de mapeamento possuem responsabilidades diferentes e nao foram misturados.

## Verificacao pos-atividade

- `EventsModule` confirma o adaptador em memoria fora do banco em `NODE_ENV=test`.
- Fora de testes, `TypeOrmEventsRepository` vincula `EVENTS_REPOSITORY` ao adaptador ORM.
- Os greps de dependencia indevida no dominio, interface, Service e Controllers retornaram vazio.
- Os mappers HTTP e de persistencia foram encontrados em arquivos distintos e permanecem separados.
