import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { EventAlreadyPublishedException } from '../../common/exceptions/event-already-published.exception.js';
import { EventNotFoundException } from '../../common/exceptions/event-not-found.exception.js';
import { EventNotPlannedException } from '../../common/exceptions/event-not-planned.exception.js';
import { EventPlanningIncompleteException } from '../../common/exceptions/event-planning-incomplete.exception.js';

@Catch(
  EventNotFoundException,
  EventAlreadyPublishedException,
  EventNotPlannedException,
  EventPlanningIncompleteException,
)
export class EventsExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof EventNotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
      });
      return;
    }

    if (
      exception instanceof EventAlreadyPublishedException ||
      exception instanceof EventNotPlannedException
    ) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: exception.message,
      });
      return;
    }

    if (exception instanceof EventPlanningIncompleteException) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: exception.message,
        missingFields: exception.missingFields,
      });
    }
  }
}
