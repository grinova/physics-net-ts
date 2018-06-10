import { BaseRouter, RouteData } from './base-router'

export interface RouteByIdData<T>
extends RouteData<T> {
  id: string
}

export class ByIdRouter<T, D extends RouteByIdData<T>>
extends BaseRouter<T, D> {
  protected getId(data: D): string {
    return data.id
  }
}
