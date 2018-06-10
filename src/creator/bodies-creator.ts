import { Body } from 'classic2d'
import { BodyCreatorProps, BodiesManager } from '../managers/bodies-manager'

export interface BodyProps
extends BodyCreatorProps {}

export class BodiesCreator<UserData> {
  private manager: BodiesManager<UserData>

  constructor(manager: BodiesManager<UserData>) {
    this.manager = manager
  }

  create<P extends BodyProps = BodyProps>(type: string, props: P): Body<UserData> {
    return this.manager.create(type, props)
  }
}
