import type { UseFormGetValues } from 'react-hook-form';
import type { FormInputs } from '../types/inputs';

function isCardNumber(
  value: string,
  name: string,
  getValues: UseFormGetValues<FormInputs>
  //setValue: UseFormSetValue<AssertsShape>
) {
  //   console.log(name);
  //   console.log(value);
  if (name === 'cardNumber') {
    const spaceOut = value.split(' ');
    const joinedRaw = spaceOut.join('');
    const cleanedValue = joinedRaw.replace(
      /^(?:[a-zA-Z]+\s?|[a-zA-Z]+\s[a-zA-Z]*)$/,
      ''
    );

    // console.log('getting value visaMaster', getValues('visaMaster'));

    if (getValues('visaMaster')) {
      if (joinedRaw.length > 15) {
        console.log('catching length', joinedRaw.length);

        return value.slice(0, 17);
      }

      return insertSeparatorEveryNChars(cleanedValue, 5, ' ');
    }
    if (joinedRaw.length > 16) {
      return value.slice(0, 19);
    }

    return insertSeparatorEveryNChars(cleanedValue, 4, ' ');
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
    const cleanedValue = value.replace(
      /^(?:[a-zA-Z]+\s?|[a-zA-Z]+\s[a-zA-Z]*)$/,
      ''
    );

    if (getValues('visaMaster')) {
      return cleanedValue.slice(0, 4);
    }

    return cleanedValue.slice(0, 3);
  }
}

function insertSeparatorEveryNChars(str: string, n: number, separator: string) {
  const regex = new RegExp(`(.{${n}})`, 'g');

  return str.replace(regex, `$1${separator}`).trim();
}

export default isCardNumber;
