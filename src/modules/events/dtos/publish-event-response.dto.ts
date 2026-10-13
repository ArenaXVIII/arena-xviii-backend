import { EventStatus } from '../../../common/enum/event-status.enum.js';

export class PublishEventResponseDto {
  constructor(
    public readonly eventId: string,
    public readonly status: EventStatus,
    public readonly updatedAt: Date,
    public readonly message: string,
  ) {}
}
