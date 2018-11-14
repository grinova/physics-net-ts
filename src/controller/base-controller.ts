import { Body, TimeDelta } from 'classic2d'
import { Controller } from './controller'

export abstract class BaseController
implements Controller {
  private body: void | Body

  constructor() {
    this.body = (void 0)
  }

  init(body: Body): void {
    this.body = body
  }

  getBody(): void | Body {
    return this.body
  }

  abstract step(time: TimeDelta): void
}
