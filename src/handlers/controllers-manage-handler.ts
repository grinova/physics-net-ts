import { ManageHandler } from './manage-handler'
import { Controller } from '../controller/controller'
import { ControllerCreatorProps } from '../managers/controllers-manager'

export class ControllersManageHandler
extends ManageHandler<ControllerCreatorProps, void | Controller> {
}
