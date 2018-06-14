import { Creator } from './creator'
import { Registrator } from './registrator'

export interface Manager<Props, Result>
extends Creator<Props, Result>, Registrator<Result> {
}
