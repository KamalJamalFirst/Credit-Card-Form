import * as yup from 'yup';

export const paySchemaDefault = yup.object({
  visaMaster: yup.boolean().default(false),
  cardNumber: yup
    .string()
    .when('visaMaster', {
      is: true,
      then: schema =>
        schema
          .matches(/^[0-9\s]+$/, 'Only numbers acceptable')
          .min(15, 'Card Number must have 15 digits')
          .matches(
            /^[0-9]{5}\s[0-9]{5}\s[0-9]{5}$/,
            'Card Number must have 15 digits'
          ),
      otherwise: schema =>
        schema
          .matches(/^[0-9\s]+$/, 'Only numbers acceptable')
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
    .matches(/^\d{2}\/\d{2}$/, 'Invalid format. Must be MM/YY') // Regex for format
    .test(
      'month-range', // Name for this test
      'Invalid month. Month must be between 01 and 12.', // Specific error message
      value => {
        if (!value) return false; // Should be caught by 'required' or 'matches' usually
        const [monthStr] = value.split('/');
        const month = parseInt(monthStr, 10);

        return month >= 1 && month <= 12;
      }
    )
    .test(
      'future-expiry', // Name for this test
      'You can’t use an expired card. Date must be in the future.', // Specific error message
      value => {
        if (!value) return false; // Should be caught by 'required' or 'matches'
        const [monthStr, yearStr] = value.split('/');
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        // If month/year parsing failed or month is out of range,
        // it should have been caught by 'matches' or 'month-range' test.
        // This is a safeguard, but these conditions should ideally be false here.
        if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
          return false;
        }

        const now = new Date();
        const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed
        const currentFullYear = now.getFullYear();

        // Convert YY to 20YY (assuming 2-digit year means 20XX for expiry)
        const fullYear = 2000 + year;

        // Check if the year is in the past
        if (fullYear < currentFullYear) {
          return false;
        }

        // If the year is the current year, check if the month is in the past
        if (fullYear === currentFullYear) {
          if (month < currentMonth) {
            return false;
          }
        }

        return true; // Date is valid and in the future
      }
    ),
  holderName: yup
    .string()
    .matches(
      /^(?:[a-zA-Z]+\s?|[a-zA-Z]+\s[a-zA-Z]*)$/,
      'Only letters acceptable'
    )
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