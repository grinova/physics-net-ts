import { Factory } from '../common/factory'
import { Manager } from '../common/manager'

export class BaseManager<CreatorProps, Result>
implements Manager<CreatorProps, Result> {
  private factory: Factory<CreatorProps, Result> = new Factory<CreatorProps, Result>()
  private objects: Map<string, Result> = new Map<string, Result>()

  create<CP extends CreatorProps = CreatorProps>(type: string, props: CP): Result {
    return this.factory.create<CP>(type, props)
  }

  createAndRegister<CP extends CreatorProps = CreatorProps>(type: string, id: string, props: CP): Result {
    const object = this.create<CP>(type, props)
    this.register(id, object)
    return object
  }

  get(id: string): void | Result {
    return this.objects.get(id)
  }

  getFactory(): Factory<CreatorProps, Result> {
    return this.factory
  }

  register(id: string, object: Result): void {
    this.objects.set(id, object)
  }

  unregister(id: string): void {
    this.objects.delete(id)
  }
}
