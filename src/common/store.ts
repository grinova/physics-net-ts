export class Store<Value, Key = string> {
  private map: Map<Key, Value> = new Map<Key, Value>()

  delete(key: Key): boolean {
    return this.map.delete(key)
  }

  has(key: Key): boolean {
    return this.map.has(key)
  }

  get(key: Key): void | Value {
    return this.map.get(key)
  }

  set(key: Key, value: Value): this {
    this.map.set(key, value)
    return this
  }
}
