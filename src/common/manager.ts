export interface Manager<Props, Result> {
  create(type: string, props: Props): Result
  createAndRegister(type: string, id: string, props: Props): Result
  get(id: string): void | Result
  register(id: string, object: Result): void
  unregister(id: string): void
}
