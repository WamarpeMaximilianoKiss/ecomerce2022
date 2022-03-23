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
import { Button } from '@material-ui/core';
import Slider from "react-slick";

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
    backgroundColor: "red",
    borderRadius: "50%",
    width: 10,
    height: 10,
    left: 0,
    top: 0,
    boxShadow: "2px 1px 2px 1px rgba(0, 0, 0, 0.6)"
  },
  imagenes: {
    display: "flex"
  }
}));


export default function Product({
  product: { id, nombre, descripcion, importe_venta, categoria, colores, imagenes }
}) {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch({
      type: actionType.ADD_TO_BASKET,
      item: {
        id,
        nombre,
        descripcion,
        importe_venta,
        categoria,
        colores,
        imagenes
      }
    })
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          action={
            <Typography
              className={classes.action}
              color='textSecondary'
            >
              {accounting.formatMoney(importe_venta)}
            </Typography>
          }
          title={nombre}
          subheader="en stock"
        />
        <Carousel imagenes={imagenes} dots={true} infinite={true} speed={100} slidesToShow={1} slidesToScroll={1} >

        </Carousel>
        <br></br>
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">
            {categoria}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Colores:
          </Typography>
          {
            colores?.map((color) => (
              <div className={classes.circulos} style={{ backgroundColor: color.codigo }}></div>
            ))
          }

        </CardContent>
        <CardActions disableSpacing>

          <Button color="primary" variant="contained" startIcon={<AddShoppingCart />}>
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
