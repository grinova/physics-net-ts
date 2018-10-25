import { ActorID, Actors } from 'actors-ts'
import { Body, TimeDelta } from 'classic2d'
import { ControllerActor } from './actors/controller-actor'
import { CustomIdGenerator } from './actors/custom-id-generator'
import { BaseController } from './controller/base-controller'
import { Simulator } from './controller/simulator'
import { ActorsCreator } from './creator/actors-creator'
import { ControllersCreator } from './creator/controllers-creator'
import { Message } from './data/message'
import { EventSender } from './event/sender'
import { ActorsManageHandler } from './handlers/actors-manage-handler'
import { BodiesManageHandler } from './handlers/bodies-manage-handler'
import { ControllersManageHandler } from './handlers/controllers-manage-handler'
import { EventHandler } from './handlers/events-handler'
import { ActorsFactory, ActorsManager } from './managers/actors-manager'
import { BodiesFactory, BodiesManager } from './managers/bodies-manager'
import { ControllerFactory, ControllersManager } from './managers/controllers-manager'
import { Net } from './net/net'
import { ManageRouter } from './routers/manage-router'
import { MessageRouter } from './routers/message-router'
import { SyncRouter } from './routers/sync-router'
import { SystemRouter } from './routers/system-router'

export class Client {
  onConnect?: () => void
  onDisconnect?: () => void

  private net: Net
  private simulator: Simulator = new Simulator()
  private sender: EventSender
  private bodiesManager: BodiesManager = new BodiesManager()
  private controllersManager: ControllersManager = new ControllersManager(this.simulator)
  private actorsManager: ActorsManager = new ActorsManager()
  private syncRouter: SyncRouter = new SyncRouter()
  private systemRouter: SystemRouter = new SystemRouter()
  private messageRouter: MessageRouter = new MessageRouter()

  constructor(net: Net) {
    this.net = net
    const actorsManager = this.actorsManager
    const controllersManager = this.controllersManager
    const bodiesManager = this.bodiesManager
    const actorsListener = {
      onSpawn(id: ActorID, actor: ControllerActor<BaseController>): void {
        actorsManager.register(id, actor)
      },
      onDestroy(id: ActorID): void {
        actorsManager.unregister(id)
      }
    }

    const rootIdGenerator = new CustomIdGenerator()
    const actors = new Actors({ rootIdGenerator })
    actors.setListener(actorsListener)

    const bodiesManageHandler = new BodiesManageHandler(bodiesManager)

    const controllersManagerHandler = new ControllersManageHandler(controllersManager, bodiesManager)
    const controllersCreator = new ControllersCreator(controllersManager, bodiesManager)
    const actorsCreator = new ActorsCreator(actorsManager, controllersCreator)
    const actorsManageHandler = new ActorsManageHandler(actorsManager, actorsCreator, controllersManager, rootIdGenerator, actors)

    const manageRouter = new ManageRouter()
    manageRouter.register('bodies', bodiesManageHandler)
    manageRouter.register('controllers', controllersManagerHandler)
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

  getBody(id: string): void | Body {
    return this.bodiesManager.get(id)
  }

  getBodiesFactory(): BodiesFactory {
    return (this.bodiesManager as BodiesManager).getFactory()
  }

  getControllersFactory(): ControllerFactory {
    return this.controllersManager.getFactory()
  }

  getActorsFactory(): ActorsFactory {
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
