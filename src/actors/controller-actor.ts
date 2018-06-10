import {
  Actor,
  ActorID,
  Exit,
  Message,
  Send,
  Spawn
  } from 'actors-ts'
import { Controller } from '../controller/controller'
import { ActorsCreator } from '../creator/actors-creator'

export interface ControllerActorProps<UserData, C extends Controller> {
  controller: C
  creator: ActorsCreator<UserData>
}

export class ControllerActor<UserData, C extends Controller, M extends Message = Message>
implements Actor<M> {
  readonly controller: C
  readonly creator: ActorsCreator<UserData>

  constructor(props: ControllerActorProps<UserData, C>) {
    this.controller = props.controller
    this.creator = props.creator
  }

  onInit?(selfId: ActorID, send: Send, spawn: Spawn, exit: Exit): void
  onMessage?(message: Message, send: Send, spawn: Spawn, exit: Exit): void
}
