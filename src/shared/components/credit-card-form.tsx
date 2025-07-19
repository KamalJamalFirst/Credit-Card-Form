/* eslint-disable prettier/prettier */
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { FormInputs } from '../types/inputs';
import SelectCard from './buttonGroup';
import { Controller, type Control, type FieldErrors, type UseFormGetValues, type UseFormRegister, type UseFormReset, type UseFormResetField, type UseFormSetValue, type UseFormTrigger } from 'react-hook-form';
import ShowError from './showError';
import type { AssertsShape } from 'yup/lib/object';
import { paySchemaDefault } from '../schema/paySchema';
import InputController from './controller';
import isCardNumber from '../helpers/isCardNumber';


export default function CreditCard({ register, reset, resetField, trigger, setValue, getValues, errors, control, placeholder, fieldsNames }: { 
    register: UseFormRegister<FormInputs>, 
    reset: UseFormReset<FormInputs>,
    resetFeild: UseFormResetField<AssertsShape>
    trigger: UseFormTrigger<AssertsShape>,
    //unregister: UseFormUnregister<FormInputs>,
    setValue: UseFormSetValue<AssertsShape>,
    getValues: UseFormGetValues<FormInputs>,
    errors: FieldErrors<FormInputs>, 
    control:  Control<FormInputs>,
    //handleSubmit:  UseFormHandleSubmit<FormInputs>,
    //cardChoice: boolean,
    //setCardChoice: React.Dispatch<React.SetStateAction<boolean>>,
    placeholder: string,
    fieldsNames: FormInputs
}) 
  {
    //const [ref, name, onChange] = register
    //console.log(props)
  console.log(placeholder)

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
      <div className='flex justify-between'>
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
            Add payment method
        </Typography>
        <SelectCard control={control} reset={reset} fieldsNames={fieldsNames}/>
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
            name='cardNumber'
            render={({ field: { onChange, value } }) => {
                const prettyValue = errors['cardNumber']?.type === 'min' ? isCardNumber(value, 'cardNumber', getValues) : value;
                
                return (
                  <InputController 
                          onChange={onChange} 
                          value={prettyValue} 
                          name='cardNumber' 
                          placeholder={placeholder} 
                          errors={errors} 
                          trigger={trigger} 
                          setValue={setValue} 
                          getValues={getValues}
                    />
                )
            }}
          />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>Expiry date</FormLabel>
          <Controller 
            control={control}
            name='expiryDate'
            render={({ field: { onChange, value } }) => (
              <InputController onChange={onChange} value={value} name='expiryDate' placeholder='MM / YY' errors={errors} trigger={trigger} getValues={getValues}/>
            )}
          />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>CVC/CVV</FormLabel>
          <Controller 
            control={control}
            name='cvv'
            render={({ field: { onChange, value } }) => (
              <InputController onChange={onChange} value={value} name='cvv' placeholder='CVC/CVV' errors={errors} trigger={trigger} getValues={getValues}/>
            )}
          />
        </FormControl>
        <FormControl required={true} sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Controller 
            control={control}
            name='holderName'
            render={({ field: { onChange, value } }) => (
              <InputController onChange={onChange} value={value} name='holderName' placeholder="Enter cardholder's full name" errors={errors} trigger={trigger} />
            )}
          />
        </FormControl>
        <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button type='submit' disabled={true} variant="solid" color="primary">
            Pay
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
