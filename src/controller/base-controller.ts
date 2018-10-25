import { Body, TimeDelta } from 'classic2d'
import { Controller } from './controller'

export abstract class BaseController
implements Controller {
  readonly body: Body

  constructor(body: Body) {
    this.body = body
  }

  abstract step(time: TimeDelta): void
}
