import { ManageHandler } from './manage-handler'
import { ControllerActor } from '../actors/controller-actor'
import { CustomIdGenerator } from '../actors/custom-id-generator'
import { ActorsCreator } from '../creator/actors-creator'
import { CreateParameters, DestroyParameters } from '../data/manage'
import { ActorCreatorProps, ActorsManager } from '../managers/actors-manager'
import { ControllersManager } from '../managers/controllers-manager'
import { Actors } from 'actors-ts'

export class ActorsManageHandler
extends ManageHandler<ActorCreatorProps, void | ControllerActor> {
  private actorsCreator: ActorsCreator
  private controllersManager: ControllersManager
  private idGenerator: CustomIdGenerator
  private actors: Actors

  constructor(
    manager: ActorsManager,
    actorsCreator: ActorsCreator,
    controllersManager: ControllersManager,
    idGenerator: CustomIdGenerator,
    actors: Actors
  ) {
    super(manager)
    this.controllersManager = controllersManager
    this.actorsCreator = actorsCreator
    this.idGenerator = idGenerator
    this.actors = actors
  }

  create({ id, type, data }: CreateParameters): void {
    this.idGenerator.id = id
    this.actors.spawn(id => {
      const controller = this.controllersManager.get(id)
      if (!controller) {
        return
      }
      const actor = super.create({ id, type, data })
      if (actor) {
        actor.init({ controller, creator: this.actorsCreator })
      }
      return actor
    })
  }

  destroy(params: DestroyParameters): void {
    this.actors.destroy(params.id)
    super.destroy(params)
  }
}
