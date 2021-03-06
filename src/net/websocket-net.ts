import { Net } from './net'
import { Handler } from '../common/handler'
import { EventMessage, Message } from '../data/message'

export type MessageHandler = Handler<Message>

export class WebSocketNet
implements Net {
  onConnect?: () => void
  onDisconnect?: () => void
  onMessage?: (message: Message) => void
  onError?: () => void

  private ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
    this.ws.addEventListener('open', this.handleOpen)
    this.ws.addEventListener('message', this.handleMessage)
    this.ws.addEventListener('close', this.handleClose)
    this.ws.addEventListener('error', this.handleError)
  }

  send(event: EventMessage): void {
    this.ws.send(JSON.stringify(event))
  }

  private handleOpen = (_event: Event): void => {
    this.onConnect && this.onConnect()
  }

  private handleMessage = (event: MessageEvent): void => {
    this.onMessage && this.onMessage(JSON.parse(event.data) as Message)
  }

  private handleError = (_event: Event): void => {
    this.onError && this.onError()
  }

  private handleClose = (_event: CloseEvent): void => {
    this.ws.removeEventListener('open', this.handleOpen)
    this.ws.removeEventListener('message', this.handleMessage)
    this.ws.removeEventListener('close', this.handleClose)
    this.ws.removeEventListener('error', this.handleError)
    this.onDisconnect && this.onDisconnect()
  }
}
