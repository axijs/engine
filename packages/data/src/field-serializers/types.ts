export interface SerializedField {
  type: string;
  value: unknown;
}

export interface SerializedGroup {
  type: 'group';
  items: Record<string, SerializedNode>;
}

export type SerializedNode = SerializedField | SerializedGroup;
