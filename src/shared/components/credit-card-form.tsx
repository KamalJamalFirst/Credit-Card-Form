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
import type { FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import ShowError from './showError';


export default function CreditCard({ register, getValues, errors, cardChoice, setCardChoice, placeholder }: { 
    register: UseFormRegister<FormInputs>, 
    getValues: UseFormGetValues<FormInputs>,
    errors: FieldErrors<FormInputs>, 
    handleSubmit:  UseFormHandleSubmit<FormInputs>,
    cardChoice: boolean,
    setCardChoice: React.Dispatch<React.SetStateAction<boolean>>,
    placeholder: string
}) 
  {
    const [ref, name, onChange] = register
    //console.log(props)
  
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
        <SelectCard cardChoice={cardChoice} setCardChoice={setCardChoice}/>
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
          <Input
            ref={ref}
            {...register('cardNumber')}
            placeholder={placeholder}
            endDecorator={<CreditCardIcon />}
          />
          <ShowError error={errors.cardNumber?.message} />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>Expiry date</FormLabel>
          <Input
            //ref={ref}
            name='expiryDate'
            onChange={() => console.log(getValues('expiryDate'))}
            placeholder="MM / YY"
            endDecorator={<CreditCardIcon />} />
          <ShowError error={errors.expiryDate?.message} />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>CVC/CVV</FormLabel>
          <Input 
            //ref={ref}
            name='cvv'
            onChange={() => console.log(getValues('cvv'))}
            placeholder="CVC/CVV"
            endDecorator={<InfoOutlined />} />
          <ShowError error={errors.cvv?.message} />
        </FormControl>
        <FormControl required={true} sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input 
            //ref={ref}
            name='holderName'
            onChange={() => console.log(getValues('holderName'))}
            placeholder="Enter cardholder's full name" />
          <ShowError error={errors.holderName?.message} />
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
