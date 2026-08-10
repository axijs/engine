import {Registry} from '@axi-engine/utils';

export interface SerializerFieldDefinition {
  // optional methods for serialization / deserialization,
  // if not set - will use cloveValue of snapshot / hydrate
  serialize(val: unknown): unknown;

  deserialize(val: unknown): unknown;
}

export class SerializerRegistry extends Registry<string, SerializerFieldDefinition> {
}
