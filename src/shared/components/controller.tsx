import Input from '@mui/joy/Input';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShowError from './showError';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormTrigger
} from 'react-hook-form';
import type { AssertsShape } from 'yup/lib/object';
import type { FormInputs } from '../types/inputs';
import isCardNumber from '../helpers/isCardNumber';

export default function InputController({
  onChange,
  value,
  name,
  placeholder,
  errors,
  trigger,
  setValue,
  getValues
}: {
  errors: FieldErrors<FormInputs>;
  placeholder: string;
  trigger: UseFormTrigger<AssertsShape>;
  name: 'cardNumber' | 'expiryDate' | 'holderName' | 'cvv';
  value: string | undefined;
  onChange: (...event: Array<any>) => void;
  fieldsNames?: boolean | undefined;
  setValue: UseFormSetValue<AssertsShape>;
  getValues: UseFormGetValues<FormInputs>;
}) {
  return (
    <>
      <Input
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        endDecorator={name === 'cardNumber' ? <CreditCardIcon /> : null}
      />
      <ShowError error={errors[name]?.message} value={value} />
    </>
  );
}
