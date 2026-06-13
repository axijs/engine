import type {FieldsData} from './data2/types.ts';

export async function testNewScopeSystem() {

  const catTest: FieldsData = {
    type: 'fields',
    data: {
      head: {type: 'number', value: 1},
      paws: {
        type: 'number', value: 4, policies: []
      },
      tail: {type: 'number', value: 1},
      stats: {
        type: 'fields',
        data: {}
      }
    }
  }

  console.log('test: ', catTest);
}
