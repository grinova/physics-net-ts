import { Actor } from 'actors-ts'
import { ControllersCreator } from './controllers-creator'
import { Creator } from '../common/creator'
import { ActorCreatorProps, ActorsManager } from '../managers/actors-manager'

export interface ActorProps {
}

export class ActorsCreator
implements Creator<ActorProps, Actor> {
  private actorsManager: ActorsManager
  private controllerCreator: ControllersCreator

  constructor(
    actorsManager: ActorsManager,
    controllerCreator: ControllersCreator
  ) {
    this.actorsManager = actorsManager
    this.controllerCreator = controllerCreator
  }

  create<Props>(id: string, type: string, bodyProps: Props): Actor {
    return this.actorsManager.get(id) ||
      this.actorsManager.create<ActorCreatorProps>(id, type, {
        controller: this.controllerCreator.create(id, type, bodyProps),
        creator: this }
      )
  }
}
