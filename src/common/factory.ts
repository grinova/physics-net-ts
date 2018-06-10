export interface Creator<Props, Result> {
  create(props: Props): Result
}

export class Factory<CreatorProps, Result> {
  private creators: Map<string, Creator<CreatorProps, Result>> =
    new Map<string, Creator<CreatorProps, Result>>()

  create<CP extends CreatorProps = CreatorProps>(type: string, props: CP): Result {
    const creator = this.creators.get(type)
    if (!creator) {
      throw new Error(['factory: can\'t find creator for type `', type, '` with props `', JSON.stringify(props), '`'].join(''))
    }
    return creator.create(props)
  }

  register<
    CP extends CreatorProps,
    R extends Result,
    C extends Creator<CP, R>
  >(type: string, creator: C): void {
    this.creators.set(type, creator)
  }

  unregister(type: string): void {
    this.creators.delete(type)
  }
}
