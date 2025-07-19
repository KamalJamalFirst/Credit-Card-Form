import * as yup from 'yup';

export const paySchemaDefault = yup.object({
  visaMaster: yup.boolean().default(false),
  cardNumber: yup
    .string()
    .when('visaMaster', {
      is: true,
      then: schema =>
        schema
          .min(15, 'Card Number must have 15 digits')
          .matches(
            /^[0-9]{5}\s[0-9]{5}\s[0-9]{5}$/,
            'Card Number must have 15 digits'
          ),
      otherwise: schema =>
        schema
          .min(16, 'Card Number must have 16 digits')
          .matches(
            /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
            'Card Number must have 16 digits'
          )
    })
    //.matches(/^[0-9]+$/, 'Only numbers acceptable')
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
    .test('is-future-date', 'You can’t use an expired card', function (value) {
      if (!value) {
        return false;
      }

      const currentDate = new Date();
      const [month, year] = value.split('/').map(item => parseInt(item, 10));

      const expiryDate = new Date(year + 2000, month, 1);

      return expiryDate > currentDate;
    }),
  holderName: yup
    .string()
    .matches(/^(?:[a-zA-Z]+|[a-zA-Z]+\s[a-zA-Z]+)$/, 'Only letters acceptable')
    .min(5, 'Holder must have at least 5 characters')
    .required('Holder name is required'),
  cvv: yup
    .string()
    .matches(/^[0-9]$/, 'Only numbers acceptable')
    .when('visaMaster', {
      is: true,
      then: schema => schema.min(4, 'Invalid CVV').max(4, 'Invalid CVV'),
      otherwise: schema => schema.min(3, 'Invalid CVV').max(3, 'Invalid CVV')
    })
    .required('CVV is required')
});

// function isNumbers() {
//   return this.matches(/^[0-9]+$/, {
//     message: 'Only numbers acceptable',
//     excludeEmptyStrings: true
//   });
// }

// yup.addMethod(yup.string, 'isNumbers', isNumbers);
// const paySchemaDefault = yup.object.shape(

// )