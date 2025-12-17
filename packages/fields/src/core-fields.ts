import {WithBooleanFields} from './mixins/with-boolean-fields.mixin';
import {WithStringFields} from './mixins/with-string-fields.mixin';
import {WithNumericFields} from './mixins/with-numeric-fields.mixin';
import {WithDefaultGenericFields} from './mixins/with-default-generic-fields.mixin';
import {Fields} from './fields';

export class CoreFields extends WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultGenericFields(Fields)))) {}

