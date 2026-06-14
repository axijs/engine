import {Field} from './field';

/** search configuration findFirst / findAll in the Fields */
export type FieldPredicate = (field: Field<any>) => boolean;
