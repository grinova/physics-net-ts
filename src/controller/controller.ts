import { Body, TimeDelta } from 'classic2d'

export interface Controller {
  init(body: Body): void
  step(time: TimeDelta): void
}
