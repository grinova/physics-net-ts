export interface Router<T> {
  route(data: T): boolean
}
