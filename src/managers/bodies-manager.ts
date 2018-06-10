import { Body } from 'classic2d'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'

export interface BodyCreatorProps {}

export type BodiesFactory<UserData> = Factory<BodyCreatorProps, Body<UserData>>

export class BodiesManager<UserData>
extends BaseManager<BodyCreatorProps, Body<UserData>> {}
