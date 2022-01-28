import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import accounting from 'accounting'
import { IconButton } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { actionType } from '../reducer';

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
  cardActions: {
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center"
  },
  cardRating: {
      display: "flex"
  }
}));

export default function CheckoutCard({
    product : {id,name,productType,image,price,rating,description}
  }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeItem = () => dispatch({
    type: actionType.REMOVE_ITEM,
    id: id
  })

  return (
    <Card key={id} className={classes.root}>
      <CardHeader
        action={
            <Typography
                className={classes.action}
                variant = 'h5'
                color = 'textSecondary'
            >
            {accounting.formatMoney(price)}
            </Typography>
        }
        title={name}
        subheader="en stock"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />

      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}>
            {Array(rating).fill().map((_,i) => (
                <p key={i}>&#11088;</p>
            ))}
        </div>
        <IconButton onClick={removeItem} >
        <DeleteIcon fontSize='large' />

        </IconButton>
      </CardActions>

    </Card>
  );
}
