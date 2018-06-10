import { Handler } from '../common/handler'
import { Registrator } from '../common/registrator'
import { Router } from '../common/router'

export interface RouteData<T> {
  data: T
}

export abstract class BaseRouter<T, D extends RouteData<T>>
implements Registrator<Handler<T>>, Router<D> {
  private handlers: Map<string, Handler<T>> = new Map<string, Handler<T>>()

  register(id: string, handler: Handler<T>): boolean {
    const has = this.handlers.has(id)
    this.handlers = this.handlers.set(id, handler)
    return !has
  }

  unregister(id: string): boolean {
    return this.handlers.delete(id)
  }

  route(data: D): boolean {
    const id = this.getId(data)
    const handler = this.handlers.get(id)
    if (handler) {
      handler.handle(data.data)
      return true
    }
    return false
  }

  protected abstract getId(data: D): string
}
