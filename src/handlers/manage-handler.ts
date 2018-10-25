import { Handler } from '../common/handler'
import { Manager } from '../common/manager'
import {
  CreateParameters,
  DestroyParameters,
  ManageData
  } from '../data/manage'

export abstract class ManageHandler<Props, Result>
implements Handler<ManageData> {
  protected manager: Manager<Props, Result>

  constructor(manager: Manager<Props, Result>) {
    this.manager = manager
  }

  create(params: CreateParameters): Result {
    return this.manager.create(params.id, params.type, params.data)
  }

  destroy(params: DestroyParameters): void {
    this.manager.destroy(params.id)
  }

  handle(manage: ManageData): void {
    switch (manage.type) {
      case 'create':
        this.create(manage.data)
        break
      case 'destroy':
        this.destroy(manage.data)
        break
    }
  }
}
