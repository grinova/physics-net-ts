import { Registrator } from './registrator'
import { Creator } from '../creator/creator'

export interface Manager<Props, Result>
extends Creator<Props, Result>, Registrator<Result> {
}
