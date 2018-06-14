import { WaveRouter, WaveData } from './wave-router'

export interface SystemData<T>
extends WaveData<T> {
}

export class SystemRouter<T = any>
extends WaveRouter<T, SystemData<T>> {
}
