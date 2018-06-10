import { Message } from 'actors-ts'
import { RouteByIdData } from '../routers/by-id-router'

export interface Event<M extends Message = Message>
extends RouteByIdData<M> {
}
