import { Body } from 'classic2d'
import { Controller } from '../controller/controller'
import { BaseManager } from './base-manager'

export interface ControllerCreatorProps<UserData> {
  body: Body<UserData>
}

export class ControllersManager<UserData>
extends BaseManager<ControllerCreatorProps<UserData>, Controller> {}
