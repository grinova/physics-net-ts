import { Body } from 'classic2d'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'

export interface BodyCreatorProps {}

export type BodiesFactory = Factory<BodyCreatorProps, Body>

export class BodiesManager
extends BaseManager<BodyCreatorProps, Body> {}
