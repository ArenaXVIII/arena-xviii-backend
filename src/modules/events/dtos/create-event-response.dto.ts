import { EventStatus } from '../../../common/enum/event-status.enum.js';

export class CreateEventResponseDto {
  constructor(
    public readonly eventId: string,
    public readonly status: EventStatus,
    public readonly createdAt: Date,
    public readonly message: string,
  ) {}
}
