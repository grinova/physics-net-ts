import { Body } from 'classic2d'
import { BaseManager } from './base-manager'

export interface BodyCreatorProps {}

export class BodiesManager<UserData>
extends BaseManager<BodyCreatorProps, Body<UserData>> {}
