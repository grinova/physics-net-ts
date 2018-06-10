export interface Creator<Props, Result> {
  create(type: string, props: Props): Result
}
