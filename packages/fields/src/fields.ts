import {Field} from './field';
import {NumberField, NumberFieldOptions} from './number-field';
import {BaseFields} from './base-fields';
import {throwIf} from '@axi-engine/utils';


export class Fields extends BaseFields<any> {

  createNumber(name: string, initialValue: number, options?: NumberFieldOptions): NumberField {
    return this.add(new NumberField(name, initialValue, options)) as NumberField;
  }

  upsetNumber(name: string, value: number, options?: NumberFieldOptions): NumberField {
    if (this.has(name)) {
      const field = this.getNumber(name);
      field.set(value);
      return field;
    }

    return this.createNumber(name, value, options) as NumberField;
  }

  getNumber(name: string): NumberField {
    const field = this.get(name);
    throwIf(!(field instanceof NumberField), `wrong field type, field ${name} not a instance of NUmberField`);
    return field as NumberField;
  }

  override create<T>(name: string, initialValue: T): Field<T> {
    return this.add(new Field<T>(name, initialValue));
  }

  override upset<T>(name: string, value: T): Field<T> {
    if (this.has(name)) {
      const field = this.get<T>(name);
      field.set(value);
      return field;
    }
    return this.create<T>(name, value);
  }

  override get<T>(name: string): Field<T> {
    throwIf(!this._fields.value.has(name), `Field with name '${name}' not exists`);
    return this._fields.value.get(name) as Field<T>;
  }
}
