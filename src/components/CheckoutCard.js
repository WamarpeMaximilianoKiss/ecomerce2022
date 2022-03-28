import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useStateValue } from '../StateProvider';
import { actionType } from '../reducer';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Box from '@material-ui/core/Box';
import { Button, Grid, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxHeight: 120,
    minHeight: 120,
    minWidth: 300,
    backgroundColor: "whitesmoke",

  },
  media: {
    display: "flex",
    maxWidth: 100,
    minWidth: 100,
    minHeight: 120,
    maxHeight: 120,
  },
  container: {
    display: "flex",
    marginTop: "30px",
  },
  cantidad: {
    display: "flex",
  },
  btnCantidades: {
    display: "flex",
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',

  },
  cantidades: {
    display: "flex",

  },
  gridItem: {
    display: "flex",
    minHeight: 100,
    maxHeight: 100,
  },

  lblCantidad: {
    marginInline: 20,
    marginTop: -20,
    alignItems: "center",
    textAlign: "center",

  },
  Opcion: {
    backgroundColor: "red",

  },
  circulos: {
    padding: 5,
    margin: 5,
    display: "inline-block",
    // position:'absolute',
    borderRadius: "50%",
    width: 5,
    height: 5,
    left: 0,
    top: 0,
    boxShadow: "2px 1px 2px 1px rgba(0, 0, 0, 0.6)"
  },
}));



export default function CheckoutCard({
  product: { Id, nombre, descripcion, importe_venta, categoria, colores, imagenes, cantidad }
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [{ basket }, dispatch] = useStateValue();
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = React.useState()

  const removeItem = () => dispatch({
    type: actionType.REMOVE_ITEM,
    id: Id
  })


  const handleSelect = (event) => {
    setSelectedColor(event.target.value);
    console.log(event.target); //
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
        cantidad: 1
      }
    });

  }


  return (
    <div>
      <Grid container spacing={3} className={classes.cantidades}>
        <Card>
          <div
            className={classes.root}
          >
            <Grid key={nombre} item xs={2} sm={2} md={2} lg={2} className={classes.gridItem}>
              <Box className={classes.root}
              >
                <CardMedia
                  component="img"
                  image={imagenes[0].link_imagen}
                  alt={descripcion}
                  className={classes.media}
                >
                </CardMedia>
              </Box>
            </Grid>
            <Grid key={Id} item xs={7} sm={7} md={7} lg={7} className={classes.gridItem}>
              <Box className={classes.root}>
                <CardContent>
                  <Typography component="div" variant="h6">
                    {nombre}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {descripcion}
                  </Typography>
                  Color:
                  <Select label="color" onChange={handleSelect} >

                    <MenuItem value="">
                      <ListItemIcon>
                        <RemoveIcon />
                      </ListItemIcon>
                      <ListItemText primary="Color" />
                    </MenuItem>
                    {
                      colores?.map((color) => (
                        <MenuItem value={color.id_color}>

                          <option className={classes.circulos} style={{ backgroundColor: color.color_hex }} value={color.id_color} id={color.id_color}> </option>
                        </MenuItem>
                      ))
                    }

                  </Select>
                </CardContent>
              </Box>
            </Grid>
            <Grid key={nombre} item xs={3} sm={3} md={3} lg={3} className={classes.gridItem}>
              <Box className={classes.container}>
                <div className={classes.cantidades}>
                  <Button id={Id} variant="contained" color="primary" size="small" className={classes.btnCantidades} onClick={removeItem}>
                    <RemoveIcon />
                  </Button>
                  <Typography component="div" variant="h2" className={classes.lblCantidad} id={Id} >
                    {cantidad}
                  </Typography>
                  <Button id={Id} variant="contained" color="primary" size="small" className={classes.btnCantidades} onClick={addToBasket}>
                    <AddIcon />
                  </Button>


                </div>
              </Box>
            </Grid>
          </div>
        </Card>
      </Grid>


    </div >

  );
}
