import { EventMessage, Message } from '../data/message'

export interface Net<SendType extends EventMessage = EventMessage> {
  onConnect?(): void
  onDisconnect?(): void
  onMessage?(message: Message): void
  onError?(): void
  send(data: SendType): void
}
