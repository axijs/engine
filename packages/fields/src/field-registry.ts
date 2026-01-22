import {Constructor, Registry} from '@axi-engine/utils';
import {Field} from './field';


export class FieldRegistry extends Registry<string, Constructor<Field<any>>> { }
