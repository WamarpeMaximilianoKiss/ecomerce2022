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
  }
}));

export default function Product({
  product: { id, nombre, descripcion, importe_venta, categoria }
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
        <CardMedia
          className={classes.media}
          image="https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png"
          title={nombre}
        />
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">
            {categoria}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="agregar al carrito" onClick={addToBasket}>
            <AddShoppingCart fontSize='large' ></AddShoppingCart>
          </IconButton>
          {Array(5).fill().map((_, i) => (
            <p key={i}>&#11088;</p>
          ))}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
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
