import { TimeDelta } from 'classic2d'

export interface Controller {
  step(time: TimeDelta): void
}
