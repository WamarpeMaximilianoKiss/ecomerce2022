import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AddShoppingCart } from '@material-ui/icons';
import accounting from 'accounting';
import { actionType } from '../reducer';
import { useStateValue } from '../StateProvider';
import Carousel from './Carousel';
import { Button, Chip, Hidden } from '@material-ui/core';
import Slider from "react-slick";
import Divider from '@material-ui/core/Divider';
import { useNavigate } from 'react-router-dom';

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 400,
    cursor: "pointer",
  },
  action: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  circulos: {
    padding: 5,
    margin: 5,
    display: "inline-block",
    // position:'absolute',
    borderRadius: "50%",
    width: 10,
    height: 10,
    left: 0,
    top: 0,
    boxShadow: "2px 1px 2px 1px rgba(0, 0, 0, 0.6)"
  },
  imagenes: {
    display: "flex"
  },
  importe: {
    marginLeft: "15px",
  },
  colores: {
    marginLeft: "5px",
    marginTop: "0px",
    minHeight: "35px",
  },
  nombreProducto: {
    marginLeft: "15px",
    subtitle1: {
      fontSize: 12,
    },
    acciones: {
      marginButton: "2px"
    }
  },
  nombreProductoOferta: {
    backgroundColor: "red",
    marginLeft: "15px",
    subtitle1: {
      fontSize: 12,
    },
    acciones: {
      marginButton: "2px"
    }
  }

}));


export default function Product({
  product: { Id, nombre, descripcion, importe_venta, categoria, colores, imagenes, id_producto_tipo, producto_tipo }
}) {
  const classes = useStyles();
  const [{ basket, productDetail }, dispatch] = useStateValue();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toCheckOut = () => {
    navigate('/ProductDetail')
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToDetail = () => {

    let cantidad = 0;
    for (let index = 0; index < basket?.length; index++) {
      const element = basket[index];
      if (element.Id === Id) {
        cantidad = element.cantidad;
      }

    }
    if (cantidad == 0)
      cantidad++;
    dispatch({
      type: actionType.SET_PROD_DETAIL,
      item: {
        Id: Id,
        nombre,
        descripcion,
        importe_venta,
        categoria,
        colores,
        imagenes,
        cantidad: cantidad,
        id_producto_tipo,
        producto_tipo,
      }
    });
    console.log("Detalle", productDetail);

    navigate('/ProductDetail')

  }

  const addToBasket = () => {
    dispatch({
      type: actionType.ADD_TO_BASKET,
      item: {
        Id: Id,
        nombre,
        descripcion,
        importe_venta,
        categoria,
        colores,
        imagenes,
        cantidad: 1,
        id_producto_tipo,
        producto_tipo,
      }
    })
  }

  return (
    <div>
      <div class="cr cr-top cr-left cr-sticky cr-red">Hello</div>
      <Card className={classes.root} onClick={addToDetail}>

        <Carousel imagenes={imagenes} dots={true} infinite={true} speed={100} slidesToShow={1} slidesToScroll={1} autoplay={false} width={300} height={200}>

        </Carousel>
        <Divider />

        <CardContent className={classes.colores}>
          {
            colores?.length > 0 ? <Chip label={colores?.length + " colores"} variant="outlined" color="primary" />
              :
              <div></div>
          }
          {/* {
            colores?.map((color) => (
              <div className={classes.circulos} style={{ backgroundColor: color.color_hex }}></div>
            ))
          } */}
        </CardContent>
        <Typography
          className={classes.importe}
          variant='h5'
        >
          {accounting.formatMoney(importe_venta)}
        </Typography>
        {
          id_producto_tipo == 2 ?
            <Typography className={classes.nombreProductoOferta} variant="body2" >
              {nombre}
            </Typography>
            :
            <Typography className={classes.nombreProducto} variant="body2" >
              {nombre}
            </Typography>
        }


        <CardActions disableSpacing className={classes.acciones}>

          <Button onClick={addToBasket} color="primary" variant="contained" startIcon={<AddShoppingCart />}>
            Agregar al carrito
          </Button>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Mostrar más"

          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent >
            <Typography paragraph>{descripcion}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
