/**
 * A plain object representation of a Field's state for serialization.
 */
export interface FieldSnapshot {
  __type: string;
  name: string;
  value: any;
  policies?: object[];
}
