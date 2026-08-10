import {describe, expect, it} from 'vitest';
import {NodeFactory} from './node-factory';
import {isGroup, isField} from './guards';

describe('NodeFactory', () => {
	it('creates raw nodes', () => {
		const node = NodeFactory.raw('custom', {a: 1});
		expect(node).toEqual({type: 'custom', value: {a: 1}});
	});

	it('creates typed fields', () => {
		const g = NodeFactory.generic(123);
		expect(g).toEqual({type: 'generic', value: 123});
		const n = NodeFactory.num(5);
		expect(n).toEqual({type: 'numeric', value: 5});
		const b = NodeFactory.bool(false);
		expect(b).toEqual({type: 'boolean', value: false});
		const s = NodeFactory.str('x');
		expect(s).toEqual({type: 'string', value: 'x'});
	});

	it('creates group with default empty items', () => {
		const group = NodeFactory.group();
		expect(isGroup(group)).toBe(true);
		expect(group.items).toEqual({});
	});

	it('creates group with provided items', () => {
		const items = {foo: NodeFactory.num(1)};
		const group = NodeFactory.group(items);
		expect(group.items.foo).toEqual(items.foo);
		expect(isField(group.items.foo)).toBe(true);
	});
});

