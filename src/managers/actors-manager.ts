import { Actor, Message } from 'actors-ts'
import { BaseManager } from './base-manager'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'

export interface ActorCreatorProps<UserData> {
  controller: Controller
  creator: ActorsCreator<UserData>
}

export class ActorsManager<UserData, M extends Message = Message>
extends BaseManager<ActorCreatorProps<UserData>, Actor<M>> {
}
