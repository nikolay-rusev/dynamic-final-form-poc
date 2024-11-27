// App.js
import React from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const onSubmit = async values => {
  console.log('Form values:', values);
};

const MyForm = () => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Field name="firstName">
                {({ input, meta }) => (
                    <TextField {...input} label="First Name" variant="outlined" error={meta.error && meta.touched} />
                )}
              </Field>
              <Field name="lastName">
                {({ input, meta }) => (
                    <TextField {...input} label="Last Name" variant="outlined" error={meta.error && meta.touched} />
                )}
              </Field>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
        )}
    />
);

function App() {
  return (
      <div>
        <h1>My Form</h1>
        <MyForm />
      </div>
  );
}

export default App;
