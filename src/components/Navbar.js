import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../assets/logo.png';
import { Button, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { actionType } from '../reducer';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import RalewayWoff2 from '../fonts/Playa/AlegreyaSansSC-Black.ttf';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
  },
  image2: {
    width: "100px",
  },
  textoLogo: {
    color: "black",
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handAuth = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionType.EMTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      navigate('/')
    }
    else {
      navigate('/signin')

    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton>
              <img
                src={logo}
                alt='Commerce.js'
                height='70px'
                className={classes.image}
              />
            </IconButton>
          </Link>

          <Typography variant='h3' component="h1" className={classes.textoLogo} style={{ fontFamily: 'Open Sans' }}>
            PLAYA BRAVA
          </Typography>

          <div className={classes.grow} />
          <Typography variant='h6' color='textPrimary' component='p'>
            Hola {user ? user.email : "Invitado"}
          </Typography>
          <div className={classes.button}>
            <Link to={"signin"}>
              <Button variant='outlined' onClick={handAuth}>
                <strong>{user ? "Cerrar sesión" : "Iniciar sesión"}</strong>
              </Button>
            </Link>
            <Link to="/checkout-page">
              <IconButton aria-label='mostrar items del carrito' color="inherit">
                <Badge badgeContent={basket?.length} color='secondary'>
                  <ShoppingCart fontSize='large' color="primary" />
                </Badge>
              </IconButton>
            </Link>
            <a

              href="https://api.whatsapp.com/send?phone=5492664848147&text=Pulceras"
              target='_blank'
              rel="WhatsApp"
              aria-label='WhatsApp'
            >
              <IconButton aria-label='WhatsApp' color="inherit">
                <WhatsAppIcon fontSize='large' color="primary" />
              </IconButton>
            </a>
            <a

              href="https://www.instagram.com/playabrava.art"
              target='_blank'
              rel="Instagram"
              aria-label='Instagram'
            >
              <IconButton aria-label='Instagram' color="inherit">
                <InstagramIcon fontSize='large' color="primary" />
              </IconButton>
            </a>
            <a

              href="https://www.Facebook.com/playabrava.art"
              target='_blank'
              rel="Facebook"
              aria-label='Facebook'
            >
              <IconButton aria-label='Facebook' color="inherit">
                <FacebookIcon fontSize='large' color="primary" />
              </IconButton>
            </a>
            <Link to="/contact">
              <IconButton aria-label='Contacto' color="inherit">
                <MailOutlineIcon fontSize='large' color="primary" />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  );
}
