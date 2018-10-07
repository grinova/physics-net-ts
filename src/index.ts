import { Message as ActorMessage } from 'actors-ts'
import { ControllerActor as _ControllerActor, ControllerActorProps as _ControllerActorProps } from './actors/controller-actor'
import { Client as _Client } from './client'
import { BaseController as _BaseController } from './controller/base-controller'
import { Controller as _Controller } from './controller/controller'
import { ActorProps as _ActorProps } from './creator/actors-creator'
import { EventMessage as _EventMessage, Message as _Message } from './data/message'
import { EventSender as _EventSender } from './event/sender'
import { NetUserData as _NetUserData } from './handlers/bodies-manage-handler'
import { Net as _Net } from './net/net'
import { WebSocketNet as _WebSocketNet } from './net/websocket-net'

export type ActorProps = _ActorProps
export const BaseController = _BaseController
export type BaseController<UserData> = _BaseController<UserData>
export const Client = _Client
export type Client<UserData extends _NetUserData> = _Client<UserData>
export type Controller = _Controller
export const ControllerActor = _ControllerActor
export type ControllerActor<UserData, C extends Controller, M extends ActorMessage = ActorMessage> = _ControllerActor<UserData, C, M>
export type ControllerActorProps<UserData, C extends Controller> = _ControllerActorProps<UserData, C>
export type EventMessage = _EventMessage
export type EventSender = _EventSender
export type NetUserData = _NetUserData
export type Net = _Net
export type Message = _Message
export const WebSocketNet = _WebSocketNet
export type WebSocketNet = _WebSocketNet
