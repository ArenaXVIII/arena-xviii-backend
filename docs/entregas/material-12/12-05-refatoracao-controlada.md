# 12-05 - Refatoracao controlada

## Decisao

Nao houve refatoracao de codigo.

## Evidencia para preservar

- Dominio, Service, Repository, persistencia e ORM nao foram alterados.
- Os mappers HTTP usam os DTOs publicos e protegem contra vazamento.
- O Controller continua delegando aos metodos originais do Service.
- Os providers resolvem o contrato de Repository sem acoplamento a TypeORM no Service.
- Build, lint, testes rapidos e integracao passaram.
- A API containerizada manteve os contratos 201, 400 e 422.

## Contratos preservados

- `createEvent(name): Promise<CreateEventResponseDto>`
- `publishEvent(eventId): Promise<PublishEventResponseDto>`
- `IEventsRepository.findEventById(eventId): Promise<Event | null>`
- `IEventsRepository.save(event: Event): Promise<Event>`
- Token `EVENTS_REPOSITORY`
- `toCreateEventResponse(...)`
- `toPublishEventResponse(...)`
- Contratos HTTP 201, 400 e 422.

## Consideracao sobre duplicacao

Existe uma implementacao em memoria alternativa nao importada. Remover ou alterar seu uso nao seria uma refatoracao justificada sem requisito externo ou falha de execucao.

## Verificacao pos-atividade

- Nenhuma alteracao de fonte ou teste foi aplicada pelo guia.
- Os arquivos modificados observados continuam correspondendo ao trabalho anterior do Material 11.
- O Cenário B permanece confirmado.
