import { EventStatus } from '../../../common/enum/event-status.enum.js';
import { EventAlreadyPublishedException } from '../../../common/exceptions/event-already-published.exception.js';
import { EventNotPlannedException } from '../../../common/exceptions/event-not-planned.exception.js';
import { EventPlanningIncompleteException } from '../../../common/exceptions/event-planning-incomplete.exception.js';

export class Event {
  private status: EventStatus;
  private updatedAt: Date;

  constructor(
    public readonly eventId: string,
    public readonly name: string,
    status: EventStatus | null,
    public readonly date: Date | null = null,
    public readonly location: string | null = null,
    public readonly budget: number | null = null,
    public readonly responsibles: string[] = [],
    public readonly activities: string[] = [],
    public readonly createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    public readonly deletedAt: Date | null = null,
  ) {
    this.status = status ?? EventStatus.PLANNING;
    this.updatedAt = updatedAt;
  }

  public getStatus(): EventStatus {
    return this.status;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Caso de uso: Divulgar Evento
  public publish(): void {
    if (this.status === EventStatus.PUBLISHED) {
      throw new EventAlreadyPublishedException();
    }

    // Ciclo de vida: apenas Planejado -> Divulgado
    if (this.status !== EventStatus.PLANNED) {
      throw new EventNotPlannedException();
    }

    // RN01: data, local, orçamento, responsáveis e atividades definidos
    const missingFields = this.getMissingPlanningFields();
    if (missingFields.length > 0) {
      throw new EventPlanningIncompleteException(missingFields);
    }

    this.status = EventStatus.PUBLISHED;
    this.updatedAt = new Date();
  }

  private getMissingPlanningFields(): string[] {
    const missing: string[] = [];

    if (!this.date) missing.push('date');
    if (!this.location) missing.push('location');
    if (this.budget === null) missing.push('budget');
    if (this.responsibles.length === 0) missing.push('responsibles');
    if (this.activities.length === 0) missing.push('activities');

    return missing;
  }
}
