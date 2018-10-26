import { Actor } from 'actors-ts'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'
import { ControllersManager } from './controllers-manager'

export interface ActorCreatorProps {
  controller: Controller
  creator: ActorsCreator
}

export type ActorsFactory = Factory<ActorCreatorProps, Actor>

export class ActorsManager
extends BaseManager<ActorCreatorProps, Actor> {
  private controllersManager: ControllersManager

  constructor(controllersManager: ControllersManager) {
    super()
    this.controllersManager = controllersManager
  }

  destroy(id: string): boolean {
    return this.controllersManager.destroy(id) && super.destroy(id)
  }
}
