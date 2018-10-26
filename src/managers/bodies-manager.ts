import { Body, World } from 'classic2d'
import { BaseManager } from './base-manager'
import { Factory } from '../common/factory'

export interface BodyCreatorProps {}

export type BodiesFactory = Factory<BodyCreatorProps, Body>

export class BodiesManager
extends BaseManager<BodyCreatorProps, Body> {
  private world: World

  constructor(world: World) {
    super()
    this.world = world
  }

  destroy(id: string): boolean {
    const body = this.store.get(id)
    if (body) {
      this.world.destroyBody(body)
    }
    return super.destroy(id)
  }
}
