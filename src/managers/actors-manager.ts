import { Actor, Message } from 'actors-ts'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'

export interface ActorCreatorProps<UserData> {
  controller: Controller
  creator: ActorsCreator<UserData>
}

export type ActorsFactory<UserData, M extends Message = Message> = Factory<ActorCreatorProps<UserData>, Actor<M>>

export class ActorsManager<UserData, M extends Message = Message>
extends BaseManager<ActorCreatorProps<UserData>, Actor<M>> {
}
