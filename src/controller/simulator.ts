import { TimeDelta } from 'classic2d'
import { Controller } from './controller'

export class Simulator extends Set<Controller> {
  simulate(time: TimeDelta): void {
    for (const controller of this) {
      controller.step(time)
    }
  }
}
