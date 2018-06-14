import { ByIdRouter, RouteByIdData } from './by-id-router'
import { Handler } from '../common/handler'

export interface WaveData<T>
extends RouteByIdData<T> {}

export class WaveRouter<T, D extends WaveData<T> = WaveData<T>>
extends ByIdRouter<T, D>
implements Handler<D> {
  handle(data: D): void {
    this.route(data)
  }
}
