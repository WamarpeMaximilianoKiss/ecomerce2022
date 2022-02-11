import { Divider } from '@material-ui/core';
import React from 'react';
import Review from './Review'


const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
    </>
  )
};

export default PaymentForm;
