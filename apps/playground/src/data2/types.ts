export type PolicyData = {
  type: string;
  [key: string]: any;
}

export type FieldData<T> = {
  type: string; //
  value: T;
  policies?: PolicyData[]; //
}

export type FieldsDataNode = FieldData<any> | FieldsData;

export type FieldsData = {
  type: 'fields';
  data?: Record<string, FieldsDataNode>;
}

