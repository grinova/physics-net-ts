import { Actors, Message } from 'actors-ts'
import { Handler } from '../common/handler'
import { Event } from '../data/event'

export class EventHandler<
  M extends Message = Message,
  E extends Event<M> = Event<M>
>
implements Handler<E> {
  private actors: Actors

  constructor(actors: Actors) {
    this.actors = actors
  }

  handle(event: E): void {
    this.actors.send(event.id, event.data)
  }
}
