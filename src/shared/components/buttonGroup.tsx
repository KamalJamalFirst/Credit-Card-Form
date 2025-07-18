/* eslint-disable prettier/prettier */
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';

export default function SelectCard({ cardChoice, setCardChoice }: { cardChoice: boolean, setCardChoice: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Stack spacing={1}>
      <ButtonGroup aria-label="outlined button group">
        <Button
          color={cardChoice ? 'neutral' : 'primary'}
          onClick={() => setCardChoice(false)}
        >
          Visa/Mastercard
        </Button>
        <Button 
            color={cardChoice ? 'primary' : 'neutral'} 
            onClick={() => setCardChoice(true)}
        >
            Amex
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
