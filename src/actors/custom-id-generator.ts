import { ActorID, NumericIdGenerator } from 'actors-ts'

export class CustomIdGenerator
extends NumericIdGenerator {
  id: ActorID = ''

  newId(): ActorID {
    if (this.id === '') {
      return super.newId()
    }
    const { id } = this
    this.id = ''
    return id
  }
}
