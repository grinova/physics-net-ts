import { Body } from 'classic2d'
import { Controller } from '../controller/controller'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'

export interface ControllerCreatorProps<UserData> {
  body: Body<UserData>
}

export type ControllerFactory<UserData> = Factory<ControllerCreatorProps<UserData>, Controller>

export class ControllersManager<UserData>
extends BaseManager<ControllerCreatorProps<UserData>, Controller> {}
