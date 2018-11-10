import { Vec2 } from 'classic2d'
import { Handler } from '../common/handler'
import { DefaultSyncData } from '../data/sync'
import { BodiesManager } from '../managers/bodies-manager'

export class DefaultSyncHandler
implements Handler<DefaultSyncData> {
  private bodiesManager: BodiesManager

  constructor(bodiesManager: BodiesManager) {
    this.bodiesManager = bodiesManager
  }

  handle(data: DefaultSyncData): void {
    for (const id in data) {
      const { position, angle, linear, angular } = data[id]
      const body = this.bodiesManager.get(id)
      if (body) {
        body.setPosition(new Vec2(position.x, position.y))
        body.setAngle(angle)
        body.linearVelocity = new Vec2(linear.x, linear.y)
        body.angularVelocity = angular
      }
    }
  }
}
