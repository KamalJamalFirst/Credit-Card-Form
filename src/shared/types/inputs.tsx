import * as yup from 'yup';
import type { paySchemaDefault } from '../schema/paySchema';

export type FormInputs = yup.InferType<typeof paySchemaDefault>;
