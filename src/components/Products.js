import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import axios from "axios";
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "whitesmoke",
  },
}));



export default function Products(props) {
  const classes = useStyles();
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    axios.get(props.baseURL + "productos/productos/cat/" + props.id_cate).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className='tituloCategoria'>
        {props.categoria}

      </div>
      <Divider></Divider>
      <br></br>
      <Grid container spacing={3}>
        {
          products?.map((product) => (
            product.id_producto_tipo < 3 ?
              <Grid key={product.Id} item xs={12} sm={6} md={4} lg={3}>
                <Product key={product.Id} product={product} />
              </Grid>
              :
              <div></div>
          ))
        }
      </Grid>
    </div>
  );
}
