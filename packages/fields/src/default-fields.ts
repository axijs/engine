import {WithBooleanFields} from './mixins/with-boolean-fields.mixin';
import {WithStringFields} from './mixins/with-string-fields.mixin';
import {WithNumericFields} from './mixins/with-numeric-fields.mixin';
import {WithGenericFields} from './mixins/with-generic-fields.mixin';
import {Fields} from './fields';

export class DefaultFields extends WithBooleanFields(WithStringFields(WithNumericFields(WithGenericFields(Fields)))) {}

