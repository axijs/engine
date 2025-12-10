import {WithBooleanFields} from './mixins/with-boolean-fields.mixin';
import {WithStringFields} from './mixins/with-string-fields.mixin';
import {WithNumericFields} from './mixins/with-numeric-fields.mixin';
import {WithDefaultFields} from './mixins/with-default-fields.mixin';
import {Fields} from './fields';

export class DefaultFields extends WithBooleanFields(WithStringFields(WithNumericFields(WithDefaultFields(Fields)))) {}

