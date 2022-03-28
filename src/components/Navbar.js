import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import logo from '../assets/logo.png';
import { Button, Badge, Hidden, ListItemIcon, Divider } from '@material-ui/core';
import { ExitToApp, Person, PersonAdd, ShoppingCart } from '@material-ui/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { actionType } from '../reducer';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  image: {
    marginRight: "10px",
  },
  image2: {
    width: "100px",
  },
  textoLogo: {
    color: "black",
  },
  links: {
    textDecoration: "none",
    color: "black",
    display: "block"
  },
  button: {
    marginTop: "10px",
  }
}));


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


export default function Navbar() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
      dispatch({
        type: actionType.SET_USER_TYPE,
        userType: null,
      });
    }

  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Abrir = (event) => {
    if (event.target.id == "salir") {
      setOpen(false);
      handAuth();
      navigate('/signin')
    }
    else if (event.target.id == "cuenta") {
      navigate('/signout')
    }
    else if (event.target.id == "login") {
      navigate('/signin')
    }

  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <section className='containerNav' >
            <div className='containerLogo'>
              <Link to="/">
                <IconButton >
                  <img
                    src={logo}
                    alt='Commerce.js'
                    height='70px'
                    className={classes.image}
                  />
                </IconButton>
              </Link>

              <div className='tituloEmpresa' >
                PLAYA BRAVA
              </div>
            </div>
            <div className={classes.grow} />


            <div className='button'>
              <div className='containerUserChart'>

                {user ? <div >
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className={classes.button}

                  >
                    {user.email}
                  </Button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link className={classes.links} to="/signin" >

                      <StyledMenuItem>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Mi cuenta" />
                      </StyledMenuItem>
                    </Link>
                    <Link className={classes.links} to="/checkout-page" >
                      <StyledMenuItem>
                        <ListItemIcon>
                          <ShoppingBasketIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Carrito" />
                      </StyledMenuItem>
                    </Link>
                    <Link className={classes.links} to="/signin" >
                      <StyledMenuItem >
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText id="salir" onClick={Abrir} primary="Salir" />
                      </StyledMenuItem>
                    </Link>
                  </StyledMenu>

                </div>
                  :
                  <div >
                    <Button
                      variant="outlined"
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleClose}
                      className={classes.button}
                      id="login"
                    >
                      Iniciar sesión
                    </Button>
                  </div>
                }

                <Link to="/checkout-page">
                  <IconButton aria-label='mostrar items del carrito' color="inherit">
                    <Badge badgeContent={basket?.length} color='secondary'>
                      <ShoppingCart fontSize='large' color="primary" />
                    </Badge>
                  </IconButton>
                </Link>
              </div>
            </div>

            <Hidden smDown>
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
            </Hidden>

            <Hidden smDown>
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
            </Hidden>
            <Hidden smDown>
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
            </Hidden>

            <Hidden smDown>
              <Link to="/contact">
                <IconButton aria-label='Contacto' color="inherit">
                  <MailOutlineIcon fontSize='large' color="primary" />
                </IconButton>
              </Link>
            </Hidden>

          </section>
        </Toolbar>
      </AppBar>
    </div >
  );
}
