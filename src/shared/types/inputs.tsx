import * as yup from 'yup';
import type { paySchemaDefault } from '../schema/paySchema';

export type FormInputs = yup.InferType<typeof paySchemaDefault>;

export interface sendSubmit {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  cvv: string;
}
