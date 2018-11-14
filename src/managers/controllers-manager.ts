import { Body } from 'classic2d'
import { BaseManager } from './base-manager'
import { BodiesManager } from './bodies-manager'
import { Factory } from '../common/factory'
import { Controller } from '../controller/controller'
import { Simulator } from '../controller/simulator'

export interface ControllerCreatorProps {
  body: Body
}

export type ControllerFactory = Factory<ControllerCreatorProps, Controller>

export class ControllersManager
extends BaseManager<ControllerCreatorProps, Controller> {
  private simulator: Simulator
  private bodiesManager: BodiesManager

  constructor(simulator: Simulator, bodiesManager: BodiesManager) {
    super()
    this.simulator = simulator
    this.bodiesManager = bodiesManager
  }

  create<CP extends ControllerCreatorProps = ControllerCreatorProps>(id: string, type: string, props: CP): Controller {
    const result = super.create<CP>(id, type, props)
    const body = this.bodiesManager.get(id)
    if (body) {
      result.init(body)
    }
    this.simulator.add(result)
    return result
  }

  destroy(id: string): boolean {
    if (!this.bodiesManager.destroy(id)) {
      return false
    }
    const controller = this.get(id)
    if (controller) {
      this.simulator.delete(controller)
    }
    return super.destroy(id)
  }
}
