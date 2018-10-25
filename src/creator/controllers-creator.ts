import { Creator } from '../common/creator'
import { Controller } from '../controller/controller'
import { BodiesManager } from '../managers/bodies-manager'
import { ControllerCreatorProps, ControllersManager } from '../managers/controllers-manager'

export interface ControllerProps {
}

export class ControllersCreator
implements Creator<ControllerProps, Controller> {
  private controllersManager: ControllersManager
  private bodiesManager: BodiesManager

  constructor(
    controllersManager: ControllersManager,
    bodiesManager: BodiesManager
  ) {
    this.controllersManager = controllersManager
    this.bodiesManager = bodiesManager
  }

  create<Props>(id: string, type: string, bodyProps: Props): Controller {
    return this.controllersManager.get(id) ||
      this.controllersManager.create<ControllerCreatorProps>(id, type, {
        body: this.bodiesManager.get(id) || this.bodiesManager.create(id, type, bodyProps)
      })
  }
}
