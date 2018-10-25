import { Body } from 'classic2d'
import { ManageHandler } from './manage-handler'
import { BodyCreatorProps } from '../managers/bodies-manager'

export interface BodyProps
extends BodyCreatorProps {}

export class BodiesManageHandler
extends ManageHandler<BodyProps, Body> {
}
