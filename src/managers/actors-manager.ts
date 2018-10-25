import { Actor } from 'actors-ts'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'

export interface ActorCreatorProps {
  controller: Controller
  creator: ActorsCreator
}

export type ActorsFactory = Factory<ActorCreatorProps, Actor>

export class ActorsManager
extends BaseManager<ActorCreatorProps, Actor> {
}
