import { BaseRouter } from './base-router'
import { Message, MessageData } from '../data/message'

export class MessageRouter
extends BaseRouter<MessageData, Message> {
  protected getId(data: Message): string {
    return data.type
  }
}
