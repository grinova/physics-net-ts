import { ManageHandler } from './manage-handler'
import { CustomIdGenerator } from '../actors/custom-id-generator'
import { ActorsCreator } from '../creator/actors-creator'
import { CreateParameters, DestroyParameters } from '../data/manage'
import { ActorCreatorProps, ActorsManager } from '../managers/actors-manager'
import { ControllersManager } from '../managers/controllers-manager'
import { Actors, Actor/* , Message */ } from 'actors-ts'

export class ActorsManageHandler/* <M extends Message = Message> */
extends ManageHandler<ActorCreatorProps, void | Actor/* <M> */> {
  private actorsCreator: ActorsCreator
  private controllersManager: ControllersManager
  private idGenerator: CustomIdGenerator
  private actors: Actors

  constructor(
    manager: ActorsManager/* <M> */,
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

  create({ id, type }: CreateParameters): void {
    this.idGenerator.id = id
    this.actors.spawn(id => {
      const controller = this.controllersManager.get(id)
      if (!controller) {
        return
      }
      return super.create({ id, type, data: { controller, creator: this.actorsCreator } })
    })
  }

  destroy(params: DestroyParameters): void {
    this.actors.destroy(params.id)
    super.destroy(params)
  }
}
