import React from 'react';
import { Form } from 'react-final-form';
import {
  TextField,
  Checkboxes,
  Radios,
  Select,
  DatePicker,
  TimePicker,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Link,
  Button,
  CssBaseline,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

const formFields = [
  {
    id: 'firstName',
    size: 6,
    field: (
      <TextField label="First Name" name="firstName" margin="none" required />
    ),
  },
  {
    id: 'lastName',
    size: 6,
    field: (
      <TextField label="Last Name" name="lastName" margin="none" required />
    ),
  },
  {
    id: 'email',
    size: 12,
    field: (
      <TextField
        type="email"
        label="Email"
        name="email"
        margin="none"
        required
      />
    ),
  },
  {
    id: 'employed',
    size: 12,
    field: (
      <Checkboxes
        name="employed"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'Employed', value: true }}
      />
    ),
  },
  {
    id: 'stooge',
    size: 12,
    field: (
      <Radios
        label="Best Stooge"
        name="stooge"
        formControlProps={{ margin: 'none' }}
        radioGroupProps={{ row: true }}
        data={[
          { label: 'Larry', value: 'larry' },
          { label: 'Moe', value: 'moe' },
          { label: 'Curly', value: 'curly' },
        ]}
      />
    ),
  },
  {
    id: 'sauces',
    size: 12,
    field: (
      <Checkboxes
        label="Sauces"
        name="sauces"
        formControlProps={{ margin: 'none' }}
        formGroupProps={{ row: true }}
        data={[
          { label: 'Ketchup', value: 'ketchup' },
          { label: 'Mustard', value: 'mustard' },
          { label: 'Salsa', value: 'salsa' },
          { label: 'Guacamole 🥑', value: 'guacamole' },
        ]}
      />
    ),
  },
  {
    id: 'notes',
    size: 12,
    field: <TextField name="notes" multiline label="Notes" margin="none" />,
  },
  {
    id: 'city',
    size: 12,
    field: (
      <Select
        name="city"
        label="Select a City"
        formControlProps={{ margin: 'none' }}
      >
        <MenuItem value="London">London</MenuItem>
        <MenuItem value="Paris">Paris</MenuItem>
        <MenuItem value="Budapest">A city with a very long Name</MenuItem>
      </Select>
    ),
  },
  {
    id: 'rendezvous',
    size: 6,
    field: (
      <DatePicker
        name="rendez-vous"
        margin="normal"
        label="Rendez-vous"
        dateAdapter={AdapterDateFns}
      />
    ),
  },
  {
    id: 'alarm',
    size: 6,
    field: (
      <TimePicker
        name="alarm"
        margin="normal"
        label="Alarm"
        dateAdapter={AdapterDateFns}
      />
    ),
  },
];

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          <span role="img" aria-label="flag">
            🏁
          </span>
          <h3>React Final Form</h3>
        </Typography>
        <Typography variant="h5" align="center" component="h2" gutterBottom>
          Material-UI Example
        </Typography>
        <Typography>
          <Link href="https://github.com/erikras/react-final-form#-react-final-form">
            Read Docs
          </Link>
          . This example demonstrates using{' '}
          <Link href="https://mui.com/material-ui/getting-started/overview/">
            Material-UI
          </Link>{' '}
          form controls.
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{ employed: true, stooge: 'larry' }}
          validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Stack spacing={2}>
                  {formFields.map((item, idx) => (
                    <Box
                      key={`form-${idx}-${item.id}`}
                      width={item.size === 6 ? '50%' : '100%'}
                    >
                      {item.field}
                    </Box>
                  ))}
                  <Box mt={2}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </Stack>
              </Paper>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}

export default App;
