import { Creator } from './creator'
import { Registrator } from './registrator'

export interface Manager<Props = any, Result = any>
extends Creator<Props, Result>, Registrator<Result> {
  get(id: string): void | Result
  destroy(id: string): boolean
}
