import { Actors } from 'actors-ts'
import {
  Body,
  TimeDelta,
  World
} from 'classic2d'
import { CustomIdGenerator } from './actors/custom-id-generator'
import { Simulator } from './controller/simulator'
import { ActorsCreator } from './creator/actors-creator'
import { ControllersCreator } from './creator/controllers-creator'
import { Message } from './data/message'
import { EventSender } from './event/sender'
import { ActorsManageHandler } from './handlers/actors-manage-handler'
import { BodiesManageHandler } from './handlers/bodies-manage-handler'
import { ControllersManageHandler } from './handlers/controllers-manage-handler'
import { DefaultSyncHandler } from './handlers/default-sync-handler'
import { EventHandler } from './handlers/events-handler'
import { ActorsFactory, ActorsManager } from './managers/actors-manager'
import { BodiesFactory, BodiesManager } from './managers/bodies-manager'
import { ControllerFactory, ControllersManager } from './managers/controllers-manager'
import { Net } from './net/net'
import { SystemSender } from './net/sender'
import { ManageRouter } from './routers/manage-router'
import { MessageRouter } from './routers/message-router'
import { SyncRouter } from './routers/sync-router'
import { SystemRouter } from './routers/system-router'

export interface ClientListener {
  onConnect?(): void
  onDisconnect?(): void
  onError?(): void
}

export class Client {
  private net: Net
  private listener: ClientListener
  private simulator: Simulator = new Simulator()
  private eventSender: EventSender
  private systemSender: SystemSender
  private bodiesManager: BodiesManager
  private controllersManager: ControllersManager
  private actorsManager: ActorsManager
  private syncRouter: SyncRouter
  private systemRouter: SystemRouter = new SystemRouter()
  private messageRouter: MessageRouter = new MessageRouter()

  constructor(net: Net, world: World, listener: ClientListener = {}) {
    this.net = net
    this.listener = listener
    this.bodiesManager = new BodiesManager(world)
    this.syncRouter = new SyncRouter(new DefaultSyncHandler(this.bodiesManager))
    this.controllersManager = new ControllersManager(this.simulator, this.bodiesManager)
    this.actorsManager = new ActorsManager(this.controllersManager)

    const rootIdGenerator = new CustomIdGenerator()
    const actors = new Actors({ rootIdGenerator })

    const bodiesManageHandler = new BodiesManageHandler(this.bodiesManager)

    const controllersManagerHandler = new ControllersManageHandler(this.controllersManager/* , this.bodiesManager */)
    const controllersCreator = new ControllersCreator(this.controllersManager, this.bodiesManager)
    const actorsCreator = new ActorsCreator(this.actorsManager, controllersCreator)
    const actorsManageHandler = new ActorsManageHandler(
      this.actorsManager,
      actorsCreator,
      this.controllersManager,
      rootIdGenerator,
      actors
    )

    const manageRouter = new ManageRouter()
    manageRouter.register('bodies', bodiesManageHandler)
    manageRouter.register('controllers', controllersManagerHandler)
    manageRouter.register('actors', actorsManageHandler)

    const eventHandler = new EventHandler(actors)

    this.messageRouter.register('manage', manageRouter)
    this.messageRouter.register('event', eventHandler)
    this.messageRouter.register('sync', this.syncRouter)
    this.messageRouter.register('system', this.systemRouter)

    this.eventSender = new EventSender(eventHandler, this.net)
    this.systemSender = new SystemSender(net)

    this.net.onConnect = this.handleConnect
    this.net.onDisconnect = this.handleDisconnect
    this.net.onMessage = this.handleMessage
    this.net.onError = this.handleError
  }

  destroy(id: string): void {
    this.actorsManager.destroy(id)
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
    return this.eventSender
  }

  getSystemSender(): SystemSender {
    return this.systemSender
  }

  getSyncRouter<T = any>(): SyncRouter<T> {
    return this.syncRouter
  }

  getSystemRouter<T = any>(): SystemRouter<T> {
    return this.systemRouter
  }

  setListener(listener: ClientListener): void {
    this.listener = listener
  }

  simulate(time: TimeDelta): void {
    this.simulator.simulate(time)
  }

  private handleConnect = (): void => {
    this.listener.onConnect && this.listener.onConnect()
  }

  private handleDisconnect = (): void => {
    this.listener.onDisconnect && this.listener.onDisconnect()
  }

  private handleMessage = (message: Message): void => {
    this.messageRouter.route(message)
  }

  private handleError = (): void => {
    this.listener.onError && this.listener.onError()
  }
}
