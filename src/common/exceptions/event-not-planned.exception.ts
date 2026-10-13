export class EventNotPlannedException extends Error {
  constructor() {
    super('Only planned events can be published.');
    this.name = 'EventNotPlannedException';
  }
}
