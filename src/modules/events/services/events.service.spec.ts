import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service.js';
import { EVENTS_REPOSITORY } from '../repositories/events.repository.interface.js';
import { Event } from '../entities/event.entity.js';
import { PublishEventResponseDto } from '../dtos/publish-event-response.dto.js';
import { EventStatus } from '../../../common/enum/event-status.enum.js';
import { EventNotFoundException } from '../../../common/exceptions/event-not-found.exception.js';
import { EventAlreadyPublishedException } from '../../../common/exceptions/event-already-published.exception.js';
import { EventNotPlannedException } from '../../../common/exceptions/event-not-planned.exception.js';
import { EventPlanningIncompleteException } from '../../../common/exceptions/event-planning-incomplete.exception.js';

const EVENT_ID = '1';

type EventData = {
  status: EventStatus;
  date: Date | null;
  location: string | null;
  budget: number | null;
  responsibles: string[];
  activities: string[];
};

const makePlannedEvent = (overrides: Partial<EventData> = {}): Event => {
  const data: EventData = {
    status: EventStatus.PLANNED,
    date: new Date('2026-11-20'),
    location: 'Ginásio UTFPR Medianeira',
    budget: 5000,
    responsibles: ['associado-1'],
    activities: ['Torneio de futsal'],
    ...overrides,
  };

  return new Event(
    EVENT_ID,
    'Interatléticas 2026',
    data.status,
    data.date,
    data.location,
    data.budget,
    data.responsibles,
    data.activities,
  );
};

describe('EventsService', () => {
  let eventsService: EventsService;
  let eventsRepository: {
    findEventById: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    const eventsRepositoryMock = {
      findEventById: vi.fn(),
      save: vi.fn(async (event: Event) => event),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EVENTS_REPOSITORY,
          useValue: eventsRepositoryMock,
        },
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    eventsRepository = module.get(EVENTS_REPOSITORY);
  });

  it('should throw EventNotFoundException when event is not found', async () => {
    eventsRepository.findEventById.mockResolvedValue(null);

    await expect(eventsService.publishEvent(EVENT_ID)).rejects.toThrow(
      EventNotFoundException,
    );
  });

  it('should fail when event is already published', async () => {
    eventsRepository.findEventById.mockResolvedValue(
      makePlannedEvent({ status: EventStatus.PUBLISHED }),
    );

    await expect(eventsService.publishEvent(EVENT_ID)).rejects.toThrow(
      EventAlreadyPublishedException,
    );
  });

  it.each([
    EventStatus.PLANNING,
    EventStatus.CANCELLED,
    EventStatus.CLOSED,
  ])('should fail when event status is %s', async (status) => {
    eventsRepository.findEventById.mockResolvedValue(
      makePlannedEvent({ status }),
    );

    await expect(eventsService.publishEvent(EVENT_ID)).rejects.toThrow(
      EventNotPlannedException,
    );
  });

  it('should fail when planning information is incomplete (RN01)', async () => {
    eventsRepository.findEventById.mockResolvedValue(
      makePlannedEvent({ location: null, responsibles: [] }),
    );

    const promise = eventsService.publishEvent(EVENT_ID);

    await expect(promise).rejects.toThrow(EventPlanningIncompleteException);
    await expect(promise).rejects.toMatchObject({
      missingFields: ['location', 'responsibles'],
    });
    expect(eventsRepository.save).not.toHaveBeenCalled();
  });

  it('should publish a planned event and return the response DTO', async () => {
    const event = makePlannedEvent();
    eventsRepository.findEventById.mockResolvedValue(event);

    const result = await eventsService.publishEvent(EVENT_ID);

    expect(result).toBeInstanceOf(PublishEventResponseDto);
    expect(result.eventId).toBe(EVENT_ID);
    expect(result.status).toBe(EventStatus.PUBLISHED);
    expect(eventsRepository.save).toHaveBeenCalledWith(event);
    expect(event.getStatus()).toBe(EventStatus.PUBLISHED);
  });
});
