import * as yup from 'yup';
import type { paySchemaDefault, paySchemaAmex } from '../schema/paySchema';

interface DefaultInputs extends yup.InferType<typeof paySchemaDefault> {
  visaMaster: boolean;
}

interface AmexInputs extends yup.InferType<typeof paySchemaAmex> {
  visaMaster: boolean;
}

export type FormInputs = DefaultInputs | AmexInputs;
