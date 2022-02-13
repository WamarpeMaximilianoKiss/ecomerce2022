import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import logo from '../assets/logo.png';
import { Button, Badge, Hidden, ListItemIcon, Divider } from '@material-ui/core';
import { Person, PersonAdd, ShoppingCart } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { actionType } from '../reducer';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
  // button: {
  //   marginLeft: theme.spacing(2),
  //   display: "flex",
  //   justifyContent: "center",
  // },
  image: {
    marginRight: "10px",
  },
  image2: {
    width: "100px",
  },
  textoLogo: {
    color: "black",
  },
  cuenta: {
    flex: "40px",
    height: "60px",
  },
  itemmenucuenta: {
    minWidth: "180",
    backgroundColor: "red",
  },

}));



export default function Navbar() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
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
    else {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


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


            <div className='button' style={{ display: 'inline-flex' }}>
              <div className='containerUserChart'>

                {user ? <div >
                  <Button
                    variant="outlined"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.cuenta}

                  >
                    <Person />
                    {user.email}
                  </Button>
                  <Popper className={classes.itemmenucuenta} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >

                        <Paper style={{ width: '180px' }} >
                          <div className={classes.itemmenucuenta}>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem id="perfil" key={1} onClick={handleClose}>Perfil</MenuItem>
                                <MenuItem id="cuenta" key={2} onClick={handleClose}>Mi cuenta</MenuItem>
                                <Divider />
                                <MenuItem id="salir" key={3} onClick={handleClose}>Salir</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </div>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
                  :
                  <div >
                    <Button
                      variant="outlined"
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleClose}
                      className={classes.cuenta}
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
