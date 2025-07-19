import type { UseFormGetValues } from 'react-hook-form';
import type { FormInputs } from '../types/inputs';

function isCardNumber(
  value: string,
  name: string,
  getValues: UseFormGetValues<FormInputs>
  //setValue: UseFormSetValue<AssertsShape>
) {
  const regexNum = /^[0-9\s]+$/;
  //   console.log(name);
  //   console.log(value);

  if (name === 'cardNumber') {
    if (regexNum.test(value)) {
      const spaceOut = value.split(' ');
      const joinedRaw = spaceOut.join('');

      // console.log('getting value visaMaster', getValues('visaMaster'));

      if (getValues('visaMaster')) {
        if (joinedRaw.length > 15) {
          console.log('catching length', joinedRaw.length);

          return value.slice(0, 17);
        }

        return insertSeparatorEveryNChars(joinedRaw, 5, ' ');
      }
      if (joinedRaw.length > 16) {
        return value.slice(0, 19);
      }

      return insertSeparatorEveryNChars(joinedRaw, 4, ' ');
    }

    return value.slice(0, value.length - 1);
  }
  if (name === 'expiryDate') {
    const cleanedValue = value.replace(/\D/g, '');
    let formattedValue = '';

    if (cleanedValue.length > 2) {
      formattedValue =
        cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2, 4);
    } else {
      formattedValue = cleanedValue;
    }
    if (formattedValue.length > 5) {
      formattedValue = formattedValue.slice(0, 5);
    }

    return formattedValue;
  }

  if (name === 'cvv') {
    if (/^[0-9]+$/.test(value)) {
      if (getValues('visaMaster')) {
        return value.slice(0, 4);
      }

      return value.slice(0, 3);
    }

    return value.slice(0, value.length - 1);
  }
}

function insertSeparatorEveryNChars(str: string, n: number, separator: string) {
  const regex = new RegExp(`(.{${n}})`, 'g');

  return str.replace(regex, `$1${separator}`).trim();
}

export default isCardNumber;
