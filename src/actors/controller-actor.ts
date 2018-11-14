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

export interface ControllerActorProps<C extends Controller> {
  controller: C
  creator: ActorsCreator
}

export class ControllerActor<C extends Controller = Controller, M extends Message = Message>
implements Actor<M> {
  private controller: void | C
  private creator: void | ActorsCreator

  constructor() {
    this.controller = (void 0)
    this.creator = (void 0)
  }

  init(props: ControllerActorProps<C>) {
    this.controller = props.controller
    this.creator = props.creator
  }

  getController(): void | C {
    return this.controller
  }

  getCreator(): void | ActorsCreator {
    return this.creator
  }

  onInit?(selfId: ActorID, send: Send, spawn: Spawn, exit: Exit): void
  onMessage?(message: Message, send: Send, spawn: Spawn, exit: Exit): void
}
