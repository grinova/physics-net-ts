import { ManageHandler } from './manage-handler'
import { Controller } from '../controller/controller'
import { CreateParameters } from '../data/manage'
import { BodiesManager } from '../managers/bodies-manager'
import { ControllerCreatorProps, ControllersManager } from '../managers/controllers-manager'

export class ControllersManageHandler
extends ManageHandler<ControllerCreatorProps, void | Controller> {
  private bodiesManager: BodiesManager

  constructor(controllersManager: ControllersManager, bodiesManager: BodiesManager) {
    super(controllersManager)
    this.bodiesManager = bodiesManager
  }

  create({ id, type }: CreateParameters): void | Controller {
    const body = this.bodiesManager.get(id)
    if (!body) {
      return
    }
    return super.create({ id, type, data: { body } })
  }
}
