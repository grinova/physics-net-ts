import { Message, SendMessage } from '../data/message'

export interface Net<T = SendMessage> {
  onConnect?(): void
  onDisconnect?(): void
  onMessage?(message: Message): void
  onError?(): void
  send(data: T): void
}
