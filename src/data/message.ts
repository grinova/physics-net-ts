import { Event } from './event'
import { Manage } from './manage'

export type EventMessage = { type: 'event', data: Event }
export type ManageMessage = { type: 'manage', data: Manage }

export type Message = EventMessage | ManageMessage

export type MessageData = Event | Manage

export type SystemMessage = { type: 'system', data: any }
export type SendMessage = EventMessage | SystemMessage
