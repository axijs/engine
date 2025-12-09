import {Fields} from '@axi-engine/fields';

export class FieldsSerializer {
  /**
   * Creates a serializable snapshot of the current state of all fields.
   * @returns A plain JavaScript object representing the values of all fields.
   */
  snapshot(fields: Fields) {
    const dump: Record<string, any> = {
      __type: 'fields'
    };

    // this._fields.forEach((field, key) => dump[key] = field.value)
    fields.fields.forEach(field => {

    });

    return {
      __type: 'fields',
    };
  }

  /**
   * Restores the state of the fields from a snapshot.
   * It uses the `upset` logic to create or update fields based on the snapshot data.
   * @param snapshot The snapshot object to load.
   */
  // hydrate(snapshot: any) {
  //   for (let key in snapshot) {
  //     if (key === '__type') {
  //       continue;
  //     }
  //     this.upset(key, snapshot[key]);
  //   }
  // }

}
