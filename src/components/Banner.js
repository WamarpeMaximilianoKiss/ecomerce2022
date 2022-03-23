import React from 'react';
import Carousel from './Carousel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '400px',
        backgroundColor: "whitesmoke",
        margin: 5,
    },
    tab: {
        backgroundColor: "primary",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        backgroundColor: "white",

    },
    cover: {
        width: 151,
    },
}));

export default function Banner(props) {
    const id_banner = props.id;
    const titulo = props.titulo;
    const imagenes = props.imagenes;
    const classes = useStyles();
    const theme = useTheme();

    console.log(props);
    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            OFERTAS FIN DE AÑO!
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Descuentos de hasta 40% en todas las pulceras
                        </Typography>
                    </CardContent>

                </div>
                <Carousel
                    imagenes={imagenes}
                    dots={true}
                    infinite={true}
                    speed={100}
                    slidesToShow={1}
                    slidesToScroll={1}
                />
            </Card>

        </div>
    );
}