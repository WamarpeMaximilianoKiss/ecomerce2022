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
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
        width: "120px"

    },
    cartaEntera: {


    },
    imagen: {
        width: "60%",
        textAlign: "center",
        alignContent: "center",
        width: "500px",
        height: "400px",
        borderRadius: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    imageListItem: {
        borderRadius: 10

    },
    title: {
        fontSize: 24,
        color: "#eceff1",
        textAlign: "left"
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    pos: {
        marginBottom: 12,
    },
    botones: {
    },
    boton: {
        width: 200,
        marginBlock: 5
    },
    cartaPrecio: {
        backgroundColor: "#eceff1",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        minHeight: 500,
        boxShadow: "3px 4px 23px 3px #888888"

    },
    cardheader: {
        backgroundColor: "#455a64",
        color: "#fff"
    },
    cantidades: {
        display: "flex",
    },
    btnCantidades: {
        display: "flex",
        maxWidth: 20,

    },
    lblCantidad: {
        margin: 20
    },
    gridAction: {
    },
    contenedor_imagen: {
        alignContent: "center",
        textAlign: "center",
    }

}));


export default function ProductDetail() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [{ productDetail }, dispatch] = useStateValue();
    const [cantidad, setCantidad] = useState(productDetail[0].cantidad);
    const [imageMain, setImageMain] = useState(null);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const imageSelect = (item) => {
        alert(item.id)
        setImageMain(item.link_imagen);
    }

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
        if (cantidad > 1) {
            let nueva = cantidad - 1;
            setCantidad(nueva);
            dispatch({
                type: actionType.REMOVE_ITEM,
                id: productDetail[0].Id,
            })
        }
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                <Grid item lg={5} md={6} sm={6} xs={12} className={classes.gridAction}>
                    <div className={classes.contenedor_imagen}   >
                        <img className={classes.imagen} src={imageMain}></img>
                    </div>
                    <div >
                        <ImageList className={classes.imageList} cols={2.5}>
                            {productDetail[0]?.imagenes?.map((item) => (
                                <ImageListItem key={item.id}
                                    onClick={() => imageSelect(item)}>
                                    <img id={item.id} className={classes.imageListItem} src={item.link_imagen} />
                                    <ImageListItemBar
                                        classes={{
                                            root: classes.titleBar,
                                        }}

                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

                <Grid item lg={3} md={4} sm={5} xs={12} className={classes.gridAction}  >
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

                                    <Grid item >
                                        <Button variant="contained" color="primary" className={classes.btnCantidades} onClick={removeItem}>
                                            <RemoveIcon />
                                        </Button>
                                    </Grid>

                                    <Grid item  >
                                        <Typography variant="h2" className={classes.lblCantidad} >
                                            {cantidad}
                                        </Typography>
                                    </Grid>

                                    <Grid item >
                                        <Button variant="contained" color="primary" className={classes.btnCantidades} onClick={addToBasket}>
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
                <Grid item lg={1} md={1} sm={1} xs={12} >
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
