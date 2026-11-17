import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventsService } from '../services/events.service.js';
import { CreateEventDto } from '../dtos/create-event.dto.js';
import { CreateEventResponseDto } from '../dtos/create-event-response.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEvent(
    @Body() body: CreateEventDto,
  ): Promise<CreateEventResponseDto> {
    const name = body?.name?.trim();

    if (!name) {
      throw new UnprocessableEntityException(
        'Event name is required and cannot be empty.',
      );
    }

    return this.eventsService.createEvent(name);
  }
}
