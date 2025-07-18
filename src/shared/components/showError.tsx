import Alert from '@mui/joy/Alert';

export default function ShowError({ error }: { error: string | undefined }) {
  if (error != undefined && error.length > 0) {
    return (
      <Alert className="mt-2" color="danger" size="sm" variant="solid">
        {error}
      </Alert>
    );
  }

  return null;
}
