import { RouteByIdData } from '../routers/by-id-router'

export interface CreateParameters {
  type: string
  id: string
  props: any
}

export interface DestroyParameters {
  id: string
}

export type ManageData =
  { type: 'create', data: CreateParameters } |
  { type: 'destroy', data: DestroyParameters }

export interface Manage
extends RouteByIdData<ManageData> {}
