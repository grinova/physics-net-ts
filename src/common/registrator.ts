export interface Registrator<T> {
  register(id: string, value: T): boolean
  unregister(id: string): boolean
}
