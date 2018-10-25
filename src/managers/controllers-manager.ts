import { Body } from 'classic2d'
import { BaseManager } from './base-manager'
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

  constructor(simulator: Simulator) {
    super()
    this.simulator = simulator
  }

  create<CP extends ControllerCreatorProps = ControllerCreatorProps>(id: string, type: string, props: CP): Controller {
    const result = super.create<CP>(id, type, props)
    this.simulator.add(result)
    return result
  }

  destroy(id: string): boolean {
    const controller = this.get(id)
    if (controller) {
      this.simulator.delete(controller)
    }
    return super.destroy(id)
  }
}
