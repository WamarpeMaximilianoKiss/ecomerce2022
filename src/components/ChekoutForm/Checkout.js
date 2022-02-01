import { Step, Paper, StepLabel, Stepper, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from "./styles";
import { useState } from 'react';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';

const Checkout = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep} /> : <PaymentForm />

  const steps = ["Direccíon de envio", "Detalles del pedido", "Confirmación"];
  return <>
    <main className={classes.layout}>
      <Paper className={classes.papper}>
        <Typography component="h1" variant="h4" align="center" >
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
          }
        </Stepper>
        <Form />
      </Paper>
    </main>
  </>;
};

export default Checkout;
