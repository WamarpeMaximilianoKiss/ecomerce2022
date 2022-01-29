import React from 'react';
import {useForm, FormProvider} from "react-hook-form";
import { Grid, Typography} from '@material-ui/core';
import AddressInput from './AddressInput';

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos del envío
      </Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
              <AddressInput required name="firstName" label="Nombre"/>
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm 