import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../StateProvider';
import Grid from '@material-ui/core/Grid';
import { Avatar, Button, Chip, Container, Divider, ImageList, ImageListItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import accounting from 'accounting';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';

import { actionType } from '../reducer';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "whitesmoke",
        borderRadius: 10
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 0,
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
    thumbnail: {
        display: "flex",

    },
    cartaEntera: {
    },
    imagen: {
        width: "80%",
        textAlign: "center",
        alignItems: "center",
        marginLeft: "50px",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
        color: "#eceff1",
        textAlign: "left"
    },
    pos: {
        marginBottom: 12,
    },
    botones: {
        textAlign: "center",
    },
    boton: {
        width: 200,
    },
    cartaPrecio: {
        backgroundColor: "#eceff1",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
    },
    cardheader: {
        backgroundColor: "#455a64",
        color: "#fff"

    },
    cantidades: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 80,
        marginRight: 70,

    },
    btnCantidades: {
        display: "flex",
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',


    },
    lblCantidad: {
        alignItems: "center",
        textAlign: "center",
    },
    imagenesChicas: {
        display: "flex",
        width: "15%",
        marginLeft: "25px",

    },
    imagenesRestantes: {
        width: "15%",
        marginLeft: "25px",
        alignItems: "center",
        verticalAlign: "center",
        textAlign: "center",
        backgroundColor: "#37474f",
        color: "white",
        fontSize: "2.4rem",
        paddingTop: "10px"
    },

}));


export default function ProductDetail() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [{ productDetail }, dispatch] = useStateValue();
    const [cantidad, setCantidad] = useState(productDetail[0].cantidad);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const addToBasket = () => {
        let nueva = cantidad + 1;
        setCantidad(nueva);
        dispatch({
            type: actionType.ADD_TO_BASKET,
            item: {
                Id: productDetail[0].Id,
                nombre: productDetail[0].nombre,
                descripcion: productDetail[0].descripcion,
                importe_venta: productDetail[0].importe_venta,
                categoria: productDetail[0].categoria,
                colores: productDetail[0].colores,
                imagenes: productDetail[0].imagenes,
                cantidad: productDetail[0].cantidad,
            }
        });


    }

    const removeItem = () => {
        let nueva = cantidad - 1;
        setCantidad(nueva);
        dispatch({
            type: actionType.REMOVE_ITEM,
            id: productDetail[0].Id,
        })
    }


    return (
        <div className={classes.root}>
            <Grid alignItems="center" justifyContent="center" container spacing={2}>
                <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div>
                        <img className={classes.imagen} src={productDetail[0].imagenes[0].link_imagen}></img>
                    </div>
                    <div className={classes.thumbnail}>
                        <img className={classes.imagenesChicas} src={productDetail[0].imagenes[0].link_imagen}></img>
                        <img className={classes.imagenesChicas} src={productDetail[0].imagenes[0].link_imagen}></img>
                        <img className={classes.imagenesChicas} src={productDetail[0].imagenes[0].link_imagen}></img>
                        <img className={classes.imagenesChicas} src={productDetail[0].imagenes[0].link_imagen}></img>
                        <div className={classes.imagenesRestantes} >+21</div>
                    </div>
                </Grid>
                <Grid item lg={3} md={4} sm={5} xs={12} >
                    <Card className={classes.cartaPrecio} >
                        <CardContent className={classes.cardheader}  >
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {productDetail[0].nombre}
                            </Typography>
                            <Typography variant="h3" component="h3">
                                {accounting.formatMoney(productDetail[0].importe_venta)}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <Chip
                                    label="Ultimos 13"
                                    clickable
                                    color="secondary"

                                />
                            </Typography>

                        </CardContent>
                        <Divider></Divider>
                        <div className={classes.botones}>
                            <Typography variant="h6" gutterBottom>
                                Envio a domicilio: $560
                                <br />
                                Envio a sucursal: $360
                            </Typography>
                            <Typography variant='h6'>
                                <Chip
                                    deleteIcon={<DoneIcon />}
                                    label=" Llevando 20 unidades envio gratis!" variant="outlined" />

                            </Typography>
                            <div className={classes.cantidades}>
                                <Grid container alignItems="center" justifyContent="center" >

                                    <Grid item lg={1} md={1}>
                                        <Button variant="contained" color="primary" size="small" className={classes.btnCantidades} onClick={removeItem}>
                                            <RemoveIcon />
                                        </Button>
                                    </Grid>

                                    <Grid item lg={10} md={10} >
                                        <Typography component="div" variant="h2" className={classes.lblCantidad} >
                                            {cantidad}
                                        </Typography>
                                    </Grid>

                                    <Grid item lg={1} md={1} >
                                        <Button variant="contained" color="primary" size="small" className={classes.btnCantidades} onClick={addToBasket}>
                                            <AddIcon />
                                        </Button>
                                    </Grid>

                                </Grid>

                            </div>
                            <Button className={classes.boton} variant="contained" color="primary">
                                Comprar
                            </Button>
                            <br></br>
                            <Button className={classes.boton} variant="outlined" color="secondary">
                                Agregar al carrito
                            </Button>
                        </div>
                    </Card>
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

            </Grid>
            <Grid container spacing={6} >
                <Grid item lg={1} md={1} sm={1} xs={1} >
                </Grid>
                <Grid item lg={10} md={10} sm={12} xs={12} >
                    <Card className={classes.root} >
                        <CardHeader

                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={productDetail[0].nombre}

                        />
                        <CardMedia>
                        </CardMedia>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
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
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}
