import { Event } from '../data/event'
import { EventMessage } from '../data/message'
import { EventHandler } from '../handlers/events-handler'
import { Net } from '../net/net'

export type EventNet = Net<EventMessage>

export class EventSender {
  private handler: EventHandler
  private net: EventNet

  constructor(router: EventHandler, net: EventNet) {
    this.handler = router
    this.net = net
  }

  send<M>(event: Event<M>): void {
    this.handler.handle(event)
    this.net.send({ type: 'event', data: event })
  }
}
