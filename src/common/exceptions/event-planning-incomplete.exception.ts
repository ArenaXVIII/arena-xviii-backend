export class EventPlanningIncompleteException extends Error {
  constructor(public readonly missingFields: string[]) {
    super(
      `Event cannot be published. Missing information: ${missingFields.join(', ')}.`,
    );
    this.name = 'EventPlanningIncompleteException';
  }
}
