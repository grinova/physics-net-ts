import { Actor } from 'actors-ts'
import { Creator } from './creator'
import { ActorsManager } from '../managers/actors-manager'
import { BodiesManager, BodyCreatorProps } from '../managers/bodies-manager'
import { ControllersManager } from '../managers/controllers-manager'

export interface ActorProps {
  bodyProps: BodyCreatorProps
}

export class ActorsCreator<UserData>
implements Creator<ActorProps, Actor> {
  private actorsManager: ActorsManager<UserData>
  private controllersManager: ControllersManager<UserData>
  private bodiesManager: BodiesManager<UserData>

  constructor(
    actorsManager: ActorsManager<UserData>,
    controllersManager: ControllersManager<UserData>,
    bodiesManager: BodiesManager<UserData>
  ) {
    this.actorsManager = actorsManager
    this.controllersManager = controllersManager
    this.bodiesManager = bodiesManager
  }

  create<P extends ActorProps = ActorProps>(type: string, props: P): Actor {
    const body = this.bodiesManager.create(type, props.bodyProps)
    const controller = this.controllersManager.create(type, { body })
    const actor = this.actorsManager.create(type, { controller, creator: this })
    return actor
  }
}
