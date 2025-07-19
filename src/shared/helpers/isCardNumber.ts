import type { UseFormGetValues } from 'react-hook-form';
import type { FormInputs } from '../types/inputs';

function isCardNumber(
  value: string,
  name: string,
  getValues: UseFormGetValues<FormInputs>,
  //setValue: UseFormSetValue<AssertsShape>
) {
//   console.log(name);
  //   console.log(value);
  if (name === 'cardNumber') {
    const spaceOut = value.split(' ');
    const joinedRaw = spaceOut.join('');

    // console.log('getting value visaMaster', getValues('visaMaster'));

    if (getValues('visaMaster')) {
      return insertSeparatorEveryNChars(joinedRaw, 5, ' ');
    }

    return insertSeparatorEveryNChars(joinedRaw, 4, ' ');
  }
}

function insertSeparatorEveryNChars(str: string, n: number, separator: string) {
  const regex = new RegExp(`(.{${n}})`, 'g');

  return str.replace(regex, `$1${separator}`).trim();
}

export default isCardNumber;
