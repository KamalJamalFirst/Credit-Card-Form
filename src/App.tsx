import { useState } from 'react';
import CreditCard from './shared/components/credit-card-form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FormInputs } from './shared/types/inputs';
import { paySchemaAmex, paySchemaDefault } from './shared/schema/paySchema';

export const App = () => {
  const [visaMaster, setAmex] = useState(false);
  const [placeholderDefault, placeholderAmex] = [
    '4242 4242 4242 4242',
    '55555 55555 55555'
  ];
  const resolver: any = visaMaster
    ? yupResolver(paySchemaAmex)
    : yupResolver(paySchemaDefault);

  const fieldsNames: FormInputs = {
    cardNumber: '',
    expiryDate: '',
    holderName: '',
    cvv: '',
    visaMaster: false
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: fieldsNames,
    resolver: resolver
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
        getValues={getValues}
        errors={errors}
        handleSubmit={handleSubmit}
        cardChoice={visaMaster}
        setCardChoice={setAmex}
        placeholder={visaMaster ? placeholderAmex : placeholderDefault}
      />
    </form>
  );
};
