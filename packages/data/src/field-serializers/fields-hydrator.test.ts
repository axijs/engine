import {describe, expect, it} from 'vitest';
import {NodeFactory} from '../fields';
import {FieldsHydrator} from './fields-hydrator';
import {SerializerRegistry} from './serializer-registry';
import {SerializedGroup} from './types';

describe('FieldsHydrator', () => {
  it('hydrates nested serialized groups into concrete field groups', () => {
    const hydrator = new FieldsHydrator();

    const snapshot: SerializedGroup = {
      type: 'group',
      items: {
        name: {type: 'string', value: 'hello'},
        nested: {
          type: 'group',
          items: {
            count: {type: 'numeric', value: 42},
          },
        },
        payload: {type: 'custom', value: {x: 1, y: [2, 3]}},
      }
    };

    console.log(hydrator.hydrate(snapshot));

    expect(hydrator.hydrate(snapshot)).toEqual({
      type: 'group',
      items: {
        name: {type: 'string', value: 'hello'},
        nested: {
          type: 'group',
          items: {
            count: {type: 'numeric', value: 42},
          },
        },
        payload: {type: 'custom', value: {x: 1, y: [2, 3]}},
      }
    });
  });

  it('uses the serializer registry when deserializing known field types', () => {
    const serializerRegistry = new SerializerRegistry();
    serializerRegistry.register('numeric', {
      serialize: (value: unknown) => Number(value) * 10,
      deserialize: (value: unknown) => Number(value) / 10,
    });

    const hydrator = new FieldsHydrator({serializerRegistry});

    expect(hydrator.hydrate({
      type: 'group',
      items: {
        score: {type: 'numeric', value: 70},
      },
    })).toEqual({
      type: 'group',
      items: {
        score: {type: 'numeric', value: 7},
      },
    });
  });

  it('patches nested groups and reports created, changed and deleted records', () => {
    const hydrator = new FieldsHydrator();

    const group = NodeFactory.group({
      name: NodeFactory.str('old-name'),
      count: NodeFactory.num(1),
      nested: NodeFactory.group({
        value: NodeFactory.num(10),
        removeMe: NodeFactory.str('delete-me'),
      }),
    });

    const snapshot: SerializedGroup = {
      type: 'group',
      items: {
        name: {type: 'string', value: 'new-name'},
        count: {type: 'numeric', value: 2},
        nested: {
          type: 'group',
          items: {
            value: {type: 'numeric', value: 11},
            added: {type: 'numeric', value: 8},
          },
        },
      },
    };

    const result = hydrator.patch(group, snapshot);

    expect(result).toMatchObject({
      changed: expect.arrayContaining([
        {path: 'name', value: 'new-name', oldValue: 'old-name'},
        {path: 'count', value: 2, oldValue: 1},
        {path: 'nested/value', value: 11, oldValue: 10},
      ]),
      deleted: [{path: 'nested/removeMe', value: 'delete-me'}],
      created: expect.arrayContaining([
        {path: 'nested/added', value: 8},
      ]),
    });

    expect(group).toEqual({
      type: 'group',
      items: {
        name: {type: 'string', value: 'new-name'},
        count: {type: 'numeric', value: 2},
        nested: {
          type: 'group',
          items: {
            value: {type: 'numeric', value: 11},
            added: {type: 'numeric', value: 8},
          },
        },
      },
    });
  });
});
