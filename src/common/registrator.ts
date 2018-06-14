import { Store } from './store'

export interface Registrator<T> {
  register(id: string, value: T): boolean
  unregister(id: string): boolean
}

export class BaseRegistrator<T>
implements Registrator<T> {
  protected store: Store<T, string> = new Store<T, string>()

  register(id: string, value: T): boolean {
    const has = this.store.has(id)
    this.store.set(id, value)
    return !has
  }

  unregister(id: string): boolean {
    return this.store.delete(id)
  }
}
