import Alert from '@mui/joy/Alert';
import type { UseFormGetValues } from 'react-hook-form';
import type { AssertsShape } from 'yup/lib/object';

export default function ShowError({
  error,
  value
}: {
  error: string | undefined;
  value: string | undefined;
}) {
  if (
    error != undefined &&
    error.length > 0 &&
    value != undefined &&
    value.length > 0
  ) {
    return (
      <Alert className="mt-2" color="danger" size="sm" variant="solid">
        {error}
      </Alert>
    );
  }

  return null;
}
