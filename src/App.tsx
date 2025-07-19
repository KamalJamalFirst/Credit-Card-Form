import CreditCard from './shared/components/credit-card-form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FormInputs } from './shared/types/inputs';
import { paySchemaDefault } from './shared/schema/paySchema';

export const App = () => {
  const [placeholderDefault, placeholderAmex] = [
    '4242 4242 4242 4242',
    '55555 55555 55555'
  ];

  const fieldsNames: FormInputs = {
    cardNumber: '',
    expiryDate: '',
    holderName: '',
    cvv: '',
    visaMaster: false
  };

  const {
    register,
    //unregister,
    reset,
    resetField,
    trigger,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: fieldsNames,
    resolver: yupResolver(paySchemaDefault)
  });

  const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <CreditCard
        register={register}
        reset={reset}
        resetField={resetField}
        trigger={trigger}
        //unregister={unregister}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        //handleSubmit={handleSubmit}
        placeholder={
          getValues('visaMaster') ? placeholderAmex : placeholderDefault
        }
        fieldsNames={fieldsNames}
      />
    </form>
  );
};
