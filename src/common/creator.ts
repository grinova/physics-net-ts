export interface Creator<Props, Result> {
  create<P extends Props>(id: string, type: string, props: P): Result
}
