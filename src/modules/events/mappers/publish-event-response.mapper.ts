import type { PublishEventResponseDto } from '../dtos/publish-event-response.dto.js';

export function toPublishEventResponse(
  response: PublishEventResponseDto,
): PublishEventResponseDto {
  return {
    eventId: response.eventId,
    status: response.status,
    updatedAt: response.updatedAt,
    message: response.message,
  };
}
