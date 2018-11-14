import { BaseManager } from './base-manager'
import { ControllersManager } from './controllers-manager'
import { ControllerActor } from '../actors/controller-actor'
import { Factory } from '../common/factory'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'

export interface ActorCreatorProps {
  controller: Controller
  creator: ActorsCreator
}

export type ActorsFactory = Factory<ActorCreatorProps, ControllerActor>

export class ActorsManager
extends BaseManager<ActorCreatorProps, ControllerActor> {
  private controllersManager: ControllersManager

  constructor(controllersManager: ControllersManager) {
    super()
    this.controllersManager = controllersManager
  }

  destroy(id: string): boolean {
    return this.controllersManager.destroy(id) && super.destroy(id)
  }
}
