/* eslint-disable prettier/prettier */
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Stack from '@mui/joy/Stack';
import { Controller, type Control, type UseFormReset } from 'react-hook-form';
import type { FormInputs } from '../types/inputs';

export default function SelectCard({ control, reset, fieldsNames }: { 
  control:  Control<FormInputs>, 
  reset: UseFormReset<FormInputs>,
  //unregister: UseFormUnregister<FormInputs>,
  fieldsNames: FormInputs
}) {
  return (
      
      <Controller
        name='visaMaster'
        control={control}
        render={({ field: { onChange, value } }) => (
            <ToggleButtonGroup >
              <Stack spacing={1} direction="row">
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    reset({
                      ...fieldsNames,
                      visaMaster: !value
                    })
                  }} 
                  color='neutral'
                  aria-pressed={value ? 'false' : 'true'}
                  sx={(theme) => ({
                    [`&[aria-pressed="true"]`]: {
                      ...theme.variants.outlinedActive.neutral,
                      borderColor: theme.vars.palette.neutral.outlinedHoverBorder
                    }
                  })}
                >
                  Visa/Mastercard
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    reset({
                      ...fieldsNames,
                      visaMaster: !value
                    })
                    onChange(true)
                  }} 
                  color='neutral'
                  aria-pressed={value ? 'true' : 'false'}
                  sx={(theme) => ({
                    [`&[aria-pressed="true"]`]: {
                      ...theme.variants.outlinedActive.neutral,
                      borderColor: theme.vars.palette.neutral.outlinedHoverBorder
                    }
                  })}
                
                >
                  Amex
                </Button>
              </Stack>
            </ToggleButtonGroup>
          )}
      />
  );
}
