import { Handler } from '../common/handler'
import { BaseRegistrator } from '../common/registrator'
import { Router } from '../common/router'

export interface RouteData<T> {
  data: T
}

export abstract class BaseRouter<T, D extends RouteData<T>>
extends BaseRegistrator<Handler<T>>
implements Router<D> {
  route(data: D): boolean {
    const id = this.getId(data)
    const handler = this.store.get(id)
    if (handler) {
      handler.handle(data.data)
      return true
    }
    return false
  }

  protected abstract getId(data: D): string
}
