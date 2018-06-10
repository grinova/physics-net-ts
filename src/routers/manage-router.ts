import { ByIdRouter } from './by-id-router'
import { Handler } from '../common/handler'
import { Manage, ManageData } from '../data/manage'

export class ManageRouter
extends ByIdRouter<ManageData, Manage>
implements Handler<Manage> {
  handle(data: Manage): void {
    this.route(data)
  }
}
