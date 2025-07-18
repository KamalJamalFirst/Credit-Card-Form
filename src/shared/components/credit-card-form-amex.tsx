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
import type { Inputs } from '../../App';
import SelectCard from './buttonGroup';


export default function CreditCardAmex({ register, errors, cardChoice, setCardChoice }: { 
    register: UseFormRegister<Inputs>, 
    errors: FieldErrors<Inputs>, cardChoice: boolean
    setCardChoice: React.Dispatch<React.SetStateAction<boolean>> 
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
            {...register("cardNumber", { required: true })}
            placeholder="55555 55555 55555"
            endDecorator={<CreditCardIcon />}
          />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>Expiry date</FormLabel>
          <Input
            {...register("expiryDate", { required: true })}
            placeholder="MM / YY"
            endDecorator={<CreditCardIcon />} />
        </FormControl>
        <FormControl required={true}>
          <FormLabel>CVC/CVV</FormLabel>
          <Input 
            {...register("cvc", { required: true })}
            placeholder="CVC/CVV"
            endDecorator={<InfoOutlined />} />
        </FormControl>
        <FormControl required={true} sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input {...register("holderName", { required: true })} placeholder="Enter cardholder's full name" />
        </FormControl>
        <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button disabled={true} variant="solid" color="primary">
            Pay
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
