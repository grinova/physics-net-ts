import { Handler } from '../common/handler'
import { CreateParameters, ManageData } from '../data/manage'

export abstract class ManageHandler
implements Handler<ManageData> {
  abstract create(params: CreateParameters): void

  handle(manage: ManageData): void {
    switch (manage.type) {
      case 'create':
        this.create(manage.data)
        break
      // TODO: Реализовать обработку сообщения destroy
      // case 'destroy':
      //   this.destroy(manage.data)
      //   break
    }
  }
}
