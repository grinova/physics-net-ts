import { ControllerActor as _ControllerActor, ControllerActorProps as _ControllerActorProps } from './actors/controller-actor'
import { Client as _Client } from './client'
import { BaseController as _BaseController } from './controller/base-controller'
import { Controller as _Controller } from './controller/controller'
import { ActorProps as _ActorProps } from './creator/actors-creator'
import { UserData as _UserData } from './data/user-data'
import { WebSocketNet as _WebSocketNet } from './net/websocket-net'

export type ActorProps = _ActorProps
export const Client = _Client
export type Controller = _Controller
export const ControllerActor = _ControllerActor
export type ControllerActorProps<UserData, C extends Controller> = _ControllerActorProps<UserData, C>
export const BaseController = _BaseController
export type UserData = _UserData
export const WebSocketNet = _WebSocketNet
