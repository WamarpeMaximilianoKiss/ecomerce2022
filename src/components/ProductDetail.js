import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { actionType } from '../reducer';
import { useStateValue } from '../StateProvider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Chip, Container, Divider, ImageList, ImageListItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Carousel from './Carousel';
import accounting from 'accounting';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minWidth: 350
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
    avatar: {
        backgroundColor: red[500],
    },
    thumbnail: {
        alignItems: "center",
        textAlign: "center",
    },
    thumbnails: {
        alignItems: "center",
        textAlign: "center",

    },
    cartaEntera: {
        display: "flex",
    },
    imagen: {
        width: "100%",
        minHeight: 298,
        maxHeight: 380,


    },
    imageList: {
        width: 200,
        height: 450,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    botones: {
        textAlign: "center",
    },

    boton: {
        width: 200,
        marginBlock: 10,

    },
    cartaPrecio: {
        backgroundColor: "whitesmoke"
    }
}));


export default function ProductDetail() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [{ productDetail }, dispatch] = useStateValue();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div className={classes.root}>
            <Container>
                <Grid spacing={1} className={classes.cartaEntera} >
                    <Grid lg={2} >
                        <ImageList rowHeight={120} className={classes.imageList} cols={1}>
                            {productDetail[0].imagenes.map((item, i) => (
                                <ImageListItem key={i} cols={1}>
                                    <img src={item.link_imagen} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} />

                    <Grid lg={6} className={classes.cartaEntera}>
                        <div className={classes.imagen}><img src={productDetail[0].imagenes[0].link_imagen} width="100%"></img></div>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} />

                    <Grid lg={4} className={classes.cartaEntera}  >

                        <Card className={classes.root}>
                            <CardContent className={classes.cartaPrecio} >
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
                                <Typography variant="body2" component="p">
                                    Envio a domicilio: $560
                                    <br />
                                    Envio a sucursal: $360

                                </Typography>
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
                </Grid>
                <Grid>
                    <Grid item lg={12}>
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
            </Container>

        </div>
    );
}
