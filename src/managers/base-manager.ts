import { Factory } from '../common/factory'
import { Manager } from '../common/manager'
import { BaseRegistrator } from '../common/registrator'

export class BaseManager<CreatorProps, Result>
extends BaseRegistrator<Result>
implements Manager<CreatorProps, Result> {
  private factory: Factory<CreatorProps, Result> = new Factory<CreatorProps, Result>()

  create<CP extends CreatorProps = CreatorProps>(type: string, props: CP): Result {
    return this.factory.create<CP>(type, props)
  }

  getFactory(): Factory<CreatorProps, Result> {
    return this.factory
  }
}
