export interface Policy<T> {
  readonly id: string;
  apply: (val: T) => T
  destroy?: () => void
}
