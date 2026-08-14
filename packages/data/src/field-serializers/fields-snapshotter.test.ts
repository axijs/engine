import {describe, expect, it} from 'vitest';
import {FieldTypeRegistry} from '../field-type-registry';
import {FieldNode, NodeFactory as f} from '../fields';
import {FieldsSnapshotter} from './fields-snapshotter';
import {SerializerRegistry} from './serializer-registry';

describe('FieldsSnapshotter', () => {
  it('snapshots nested groups and leaf fields recursively', () => {
    const snapshotter = new FieldsSnapshotter();

    const group = f.group({
      name: f.str('hello'),
      nested: f.group({
        count: f.num(42),
      }),
      payload: f.raw('custom', {x: 1, y: [2, 3]}) as FieldNode,
    });

    expect(snapshotter.snapshot(group)).toEqual({
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
      },
    });
  });

  it('uses the serializer registry when a field type is registered', () => {
    const serializerRegistry = new SerializerRegistry();
    serializerRegistry.register('numeric', {
      serialize: (value: unknown) => Number(value) * 10,
      deserialize: (value: unknown) => Number(value) / 10,
    });

    const snapshotter = new FieldsSnapshotter({
      typeRegistry: new FieldTypeRegistry(),
      serializerRegistry,
    });

    const group = f.group({
      score: f.num(7),
    });

    expect(snapshotter.snapshot(group)).toEqual({
      type: 'group',
      items: {
        score: {type: 'numeric', value: 70},
      },
    });
  });

  it('deep-clones unregistered complex values instead of reusing the original object', () => {
    const snapshotter = new FieldsSnapshotter();
    const payload = {meta: {items: [1, 2, 3]}};
    const group = f.group({
      data: f.raw('custom', payload) as FieldNode,
    });

    const snapshot = snapshotter.snapshot(group);

    expect((snapshot.items as any).data.value).toEqual(payload);
    expect((snapshot.items as any).data.value).not.toBe(payload);
  });
});
