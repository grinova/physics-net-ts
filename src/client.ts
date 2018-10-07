import { ActorID, Actors } from 'actors-ts'
import { TimeDelta } from 'classic2d'
import { ControllerActor } from './actors/controller-actor'
import { CustomIdGenerator } from './actors/custom-id-generator'
import { BaseController } from './controller/base-controller'
import { Simulator } from './controller/simulator'
import { ActorsCreator } from './creator/actors-creator'
import { BodiesCreator } from './creator/bodies-creator'
import { Message } from './data/message'
import { EventSender } from './event/sender'
import { ActorsManageHandler } from './handlers/actors-manage-handler'
import { BodiesManageHandler, NetUserData } from './handlers/bodies-manage-handler'
import { EventHandler } from './handlers/events-handler'
import { ActorsFactory, ActorsManager } from './managers/actors-manager'
import { BodiesFactory, BodiesManager } from './managers/bodies-manager'
import { ControllerFactory, ControllersManager } from './managers/controllers-manager'
import { Net } from './net/net'
import { ManageRouter } from './routers/manage-router'
import { MessageRouter } from './routers/message-router'
import { SyncRouter } from './routers/sync-router'
import { SystemRouter } from './routers/system-router'

export class Client<UserData extends NetUserData> {
  onConnect?: () => void
  onDisconnect?: () => void

  private net: Net
  private simulator: Simulator = new Simulator()
  private sender: EventSender
  private bodiesManager: BodiesManager<UserData> = new BodiesManager<UserData>()
  private controllersManager: ControllersManager<UserData> = new ControllersManager<UserData>()
  private actorsManager: ActorsManager<UserData> = new ActorsManager<UserData>()
  private syncRouter: SyncRouter = new SyncRouter()
  private systemRouter: SystemRouter = new SystemRouter()
  private messageRouter: MessageRouter = new MessageRouter()

  constructor(net: Net) {
    this.net = net
    this.simulator = new Simulator()
    const simulator = this.simulator
    const actorsManager = this.actorsManager
    const controllersManager = this.controllersManager
    const bodiesManager = this.bodiesManager
    const actorsListener = {
      onSpawn(id: ActorID, actor: ControllerActor<UserData, BaseController<UserData>>): void {
        actorsManager.register(id, actor)
        controllersManager.register(id, actor.controller)
        simulator.add(actor.controller)
        bodiesManager.register(id, actor.controller.body)
      }
    }

    const rootIdGenerator = new CustomIdGenerator()
    const actors = new Actors({ rootIdGenerator })
    actors.setListener(actorsListener)

    const bodiesCreator = new BodiesCreator<UserData>(this.bodiesManager)
    const bodiesManageHandler = new BodiesManageHandler<UserData>(bodiesCreator)

    const actorsCreator = new ActorsCreator<UserData>(this.actorsManager, this.controllersManager, this.bodiesManager)
    const actorsManageHandler = new ActorsManageHandler<UserData>(actorsCreator, rootIdGenerator, actors)

    const manageRouter = new ManageRouter()
    manageRouter.register('bodies', bodiesManageHandler)
    manageRouter.register('actors', actorsManageHandler)

    const eventHandler = new EventHandler(actors)

    this.messageRouter.register('manage', manageRouter)
    this.messageRouter.register('event', eventHandler)
    this.messageRouter.register('sync', this.syncRouter)
    this.messageRouter.register('system', this.systemRouter)

    this.sender = new EventSender(eventHandler, this.net)

    this.net.onConnect = this.handleConnect
    this.net.onDisconnect = this.handleDisconnect
    this.net.onMessage = this.handleMessage
  }

  getBodiesFactory<UD extends UserData = UserData>(): BodiesFactory<UD> {
    return (this.bodiesManager as BodiesManager<UD>).getFactory()
  }

  getControllersFactory<UD extends UserData = UserData>(): ControllerFactory<UD> {
    return this.controllersManager.getFactory()
  }

  getActorsFactory<UD extends UserData = UserData, M extends Message = Message>(): ActorsFactory<UD, M> {
    return this.actorsManager.getFactory()
  }

  getEventSender(): EventSender {
    return this.sender
  }

  getSyncRouter<T = any>(): SyncRouter<T> {
    return this.syncRouter
  }

  getSystemRouter<T = any>(): SystemRouter<T> {
    return this.systemRouter
  }

  simulate(time: TimeDelta): void {
    this.simulator.simulate(time)
  }

  private handleConnect = (): void => {
    this.onConnect && this.onConnect()
  }

  private handleDisconnect = (): void => {
    this.onDisconnect && this.onDisconnect()
  }

  private handleMessage = (message: Message): void => {
    this.messageRouter.route(message)
  }
}
