import Input from '@mui/joy/Input';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShowError from './showError';
import type { FormInputs } from '../types/inputs';
import type { FieldErrors } from 'react-hook-form';

export default function InputController({
  onChange,
  value,
  name,
  placeholder,
  errors
}: {
  errors: FieldErrors<FormInputs>;
  placeholder: string;
  name: 'cardNumber' | 'expiryDate' | 'holderName' | 'cvv';
  value: string | undefined;
  onChange: (...event: Array<any>) => void;
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
