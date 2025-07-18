/* eslint-disable prettier/prettier */
import * as yup from 'yup';

export const paySchemaDefault = yup.object({
  cardNumber: yup
    .string()
    .min(16, 'Card Number must have 16 digits')
    .matches(/^[0-9]$/, 'Only numbers acceptable')
    .required('Card number is required'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .test('valid-month', 'Invalid month', function (value) {
      if (!value) {
        return false;
      }

      const [month] = value.split('/').map(item => parseInt(item, 10));

      return month >= 1 && month <= 12;
    })
    .test(
      'is-future-date',
      "You can’t use an expired card",
      function (value) {
        if (!value) {
          return false;
        }

        const currentDate = new Date();
        const [month, year] = value.split('/').map(item => parseInt(item, 10));

        const expiryDate = new Date(year + 2000, month, 1);

        return expiryDate > currentDate;
      }
    ),
  holderName: yup
    .string()
    .min(5, "Holder must have at least 5 characters")
    .matches(/^(?:[a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)$/, "Only letters acceptable")
    .required('Holder name is required'),
  cvv: yup
    .string()
    .min(3, 'Invalid CVC/CVV')
    .max(3, 'Invalid CVC/CVV')
    .matches(/^[0-9]$/, 'Only numbers acceptable')
    .required('CVV is required'),
});

export const paySchemaAmex = paySchemaDefault.shape({
    cardNumber: yup
    .string()
    .min(15, 'Card Number must have 15 digits')
    .matches(/^[0-9]$/, 'Only numbers acceptable')
    .required('Card number is required'),
    cvv: yup
    .string()
    .min(4, 'Invalid CVV')
    .max(4, 'Invalid CVV')
    .matches(/^[0-9]$/, 'Only numbers acceptable')
    .required('CVV is required')
});
