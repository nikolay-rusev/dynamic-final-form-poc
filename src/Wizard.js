import React, { useState, useMemo, useCallback } from 'react';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Form } from 'react-final-form';
import { Typography, Button, Box } from '@mui/material';

const WizardForm = ({ page, initialValues, children, onSubmit }) => {
  const [state, setState] = useState({
    values: initialValues || {},
    page: page || 0,
  });

  const activePage = useMemo(
    () => React.Children.toArray(children)[state.page],
    [state.page, children],
  );

  const isLastPage = useMemo(
    () => state.page === React.Children.count(children) - 1,
    [state.page, children],
  );

  const onNextStep = useCallback(
    (values) =>
      setState({
        page: Math.min(state.page + 1, children.length - 1),
        values,
      }),
    [state.page, children],
  );

  const onBackStep = useCallback(
    () =>
      setState({
        page: Math.max(state.page - 1, 0),
        values: state.values,
      }),
    [state],
  );

  const validate = useCallback(
    (values) =>
      activePage.props.validate ? activePage.props.validate(values) : {},
    [activePage],
  );

  const handleSubmit = useCallback(
    (values) => (isLastPage ? onSubmit(values) : onNextStep(values)),
    [isLastPage, onSubmit, onNextStep],
  );

  return (
    <React.Fragment>
      <WizardForm.Title text="Awesome Wizard Form" />
      <WizardForm.Stepper
        activeStep={state.page}
        totalSteps={React.Children.count(children)}
      />
      <Form
        validate={validate}
        onSubmit={handleSubmit}
        initialValues={state.values}
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            {state.page > 0 && (
              <Button variant="outlined" type="button" onClick={onBackStep}>
                « Previous
              </Button>
            )}
            {!isLastPage && (
              <Button variant="outlined" type="submit">
                Next »
              </Button>
            )}
            {isLastPage && (
              <Button variant="outlined" type="submit" disabled={submitting}>
                Submit
              </Button>
            )}
            <pre>{JSON.stringify(values, 0, 2)}</pre>
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
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

WizardForm.Step = ({ children }) => children;

WizardForm.Title = ({ text }) => (
  <Typography variant="h4" align="center">
    {text}
  </Typography>
);

WizardForm.Stepper = ({ activeStep, totalSteps }) => (
  <Stepper alternativeLabel activeStep={activeStep}>
    {new Array(totalSteps).fill(totalSteps).map((_, idx) => (
      <Step key={`step-${idx}`}>
        <StepLabel>Step {idx}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default WizardForm;
