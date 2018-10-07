import { ManageHandler } from './manage-handler'
import { BodiesCreator } from '../creator/bodies-creator'
import { CreateParameters } from '../data/manage'

export interface NetUserData {
  id: string
}

export class BodiesManageHandler<UserData extends NetUserData>
extends ManageHandler {
  private creator: BodiesCreator<UserData>

  constructor(creator: BodiesCreator<UserData>) {
    super()
    this.creator = creator
  }

  create(params: CreateParameters): void {
    const body = this.creator.create(params.type, params.props)
    if (body.userData) {
      body.userData.id = params.id
    } else {
      throw new Error(['Body with ID', params.id, ' have empty userData field'].join(' '))
    }
  }
}
