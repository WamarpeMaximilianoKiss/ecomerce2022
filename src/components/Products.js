import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import products from '../product-data';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding : theme.spacing(2),
  },
 
}));

export default function Products() {
  const classes = useStyles();
  for (let index = 0; index < products.length; index++) {
    const element = products[index].id;
    console.log("id: ",element);
    
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          {
              products?.map((product) => (
                <Grid key={product.id.toString()} item xs={12} sm={6} md={4} lg={3}>
                    <Product key={product.id.toString()} product={product}/>
                </Grid>
              ))
          }
      </Grid>
    </div>
  );
}
