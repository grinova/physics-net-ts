import { Actors } from 'actors-ts'
import { ManageHandler } from './manage-handler'
import { CustomIdGenerator } from '../actors/custom-id-generator'
import { ActorsCreator } from '../creator/actors-creator'
import { CreateParameters } from '../data/manage'

export class ActorsManageHandler<UserData>
extends ManageHandler {
  private creator: ActorsCreator<UserData>
  private idGenerator: CustomIdGenerator
  private actors: Actors

  constructor(creator: ActorsCreator<UserData>, idGenerator: CustomIdGenerator, actors: Actors) {
    super()
    this.creator = creator
    this.idGenerator = idGenerator
    this.actors = actors
  }

  create(params: CreateParameters): void {
    this.idGenerator.id = params.id
    this.actors.spawn(this.creator.create(params.type, params.props))
  }
}
