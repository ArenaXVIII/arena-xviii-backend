export class EventAlreadyPublishedException extends Error {
  constructor() {
    super('Event is already published.');
    this.name = 'EventAlreadyPublishedException';
  }
}
