import type { CreateEventResponseDto } from '../dtos/create-event-response.dto.js';

export function toCreateEventResponse(
  response: CreateEventResponseDto,
): CreateEventResponseDto {
  return {
    eventId: response.eventId,
    status: response.status,
    createdAt: response.createdAt,
    message: response.message,
  };
}
