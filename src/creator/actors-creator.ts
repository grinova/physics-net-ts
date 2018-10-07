import { Actor } from 'actors-ts'
import { Creator } from '../common/creator'
import { ActorCreatorProps, ActorsManager } from '../managers/actors-manager'
import { BodiesManager, BodyCreatorProps } from '../managers/bodies-manager'
import { ControllerCreatorProps, ControllersManager } from '../managers/controllers-manager'

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
    const body = this.bodiesManager.create<BodyCreatorProps>(type, props.bodyProps)
    const controller = this.controllersManager.create<ControllerCreatorProps<UserData>>(type, { body })
    const actor = this.actorsManager.create<ActorCreatorProps<UserData>>(type, { controller, creator: this })
    return actor
  }
}
