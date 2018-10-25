import { Factory } from '../common/factory'
import { Manager } from '../common/manager'
import { BaseRegistrator } from '../common/registrator'

export class BaseManager<CreatorProps, Result>
extends BaseRegistrator<Result>
implements Manager<CreatorProps, Result> {
  private factory: Factory<CreatorProps, Result> = new Factory<CreatorProps, Result>()

  create<CP extends CreatorProps = CreatorProps>(id: string, type: string, props: CP): Result {
    const result = this.factory.create<CP>(type, props)
    this.register(id, result)
    return result
  }

  has(id: string): boolean {
    return this.store.has(id)
  }

  get(id: string): void | Result {
    if (this.store.has(id)) {
      return this.store.get(id)
    }
  }

  destroy(id: string): boolean {
    return this.store.delete(id)
  }

  getFactory(): Factory<CreatorProps, Result> {
    return this.factory
  }
}
