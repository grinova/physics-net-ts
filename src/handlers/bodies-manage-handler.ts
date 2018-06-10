import { ManageHandler } from './manage-handler'
import { BodiesCreator } from '../creator/bodies-creator'
import { CreateParameters } from '../data/manage'
import { UserData } from '../data/user-data'

export class BodiesManageHandler
extends ManageHandler {
  private creator: BodiesCreator<UserData>

  constructor(creator: BodiesCreator<UserData>) {
    super()
    this.creator = creator
  }

  create(params: CreateParameters): void {
    const body = this.creator.create(params.type, params.props)
    if (!body.userData) {
      body.userData = { id: params.id }
    } else {
      body.userData.id = params.id
    }
  }
}
