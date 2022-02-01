import { Divider } from '@material-ui/core';
import React from 'react';
import Review from './Review'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("");

const PaymentForm = ({backStep, nextStep}) => {
  return (
    <>
      <Review/>
      <Divider/>
    </>
  )
};

export default PaymentForm;
