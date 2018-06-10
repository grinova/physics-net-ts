import { Body, TimeDelta } from 'classic2d'
import { Controller } from './controller'

export abstract class BaseController<UserData>
implements Controller {
  readonly body: Body<UserData>

  constructor(body: Body<UserData>) {
    this.body = body
  }

  abstract step(time: TimeDelta): void
}
