import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import type { FormInputs } from '../types/inputs';
import SelectCard from './buttonGroup';
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormReset
} from 'react-hook-form';
import InputController from './controller';
import isCardNumber from '../helpers/isCardNumber';
import type { BooleanSchema } from 'yup';
import type { AssertsShape } from 'yup/lib/object';
import type { RequiredStringSchema } from 'yup/lib/string';
import type { AnyObject } from 'yup/lib/types';

export default function CreditCard({
  reset,
  control,
  getValues,
  errors,
  placeholder,
  fieldsNames,
  isValid
}: {
  reset: UseFormReset<FormInputs>;
  control: Control<
    AssertsShape<{
      visaMaster: BooleanSchema<boolean, AnyObject, boolean>;
      cardNumber: RequiredStringSchema<string | undefined, AnyObject>;
      expiryDate: RequiredStringSchema<string | undefined, AnyObject>;
      holderName: RequiredStringSchema<string | undefined, AnyObject>;
      cvv: RequiredStringSchema<string | undefined, AnyObject>;
    }>
  >;
  getValues: UseFormGetValues<FormInputs>;
  errors: FieldErrors<FormInputs>;
  placeholder: string;
  fieldsNames: FormInputs;
  isValid: boolean;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal'
      }}
    >
      <div className="flex justify-between">
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Add payment method
        </Typography>
        <SelectCard control={control} reset={reset} fieldsNames={fieldsNames} />
      </div>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5
        }}
      >
        <FormControl required={true} sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card number</FormLabel>
          <Controller
            control={control}
            name="cardNumber"
            render={({ field: { onChange, value } }) => {
              const prettyValue = isCardNumber(value, 'cardNumber', getValues);

              return (
                <InputController
                  onChange={onChange}
                  value={prettyValue}
                  name="cardNumber"
                  placeholder={placeholder}
                  errors={errors}
                />
              );
            }}
          />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>Expiry date</FormLabel>
          <Controller
            control={control}
            name="expiryDate"
            render={({ field: { onChange, value } }) => {
              const prettyValue = isCardNumber(value, 'expiryDate', getValues);

              return (
                <InputController
                  onChange={onChange}
                  value={prettyValue}
                  name="expiryDate"
                  placeholder={'MM / YY'}
                  errors={errors}
                />
              );
            }}
          />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>CVC/CVV</FormLabel>
          <Controller
            control={control}
            name="cvv"
            render={({ field: { onChange, value } }) => {
              const prettyValue = isCardNumber(value, 'cvv', getValues);

              return (
                <InputController
                  onChange={onChange}
                  value={prettyValue}
                  name="cvv"
                  placeholder={'CVC/CVV'}
                  errors={errors}
                />
              );
            }}
          />
        </FormControl>
        <FormControl required={true} sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Controller
            control={control}
            name="holderName"
            render={({ field: { onChange, value } }) => (
              <InputController
                onChange={onChange}
                value={value}
                name="holderName"
                placeholder={"Enter cardholder's full name"}
                errors={errors}
              />
            )}
          />
        </FormControl>
        <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button
            type="submit"
            disabled={isValid ? false : true}
            variant="solid"
            color="primary"
          >
            Pay
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
