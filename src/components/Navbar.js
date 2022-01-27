import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../assets/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import {Button,Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
  image:{
      marginRight: "10px",
  }
}));

 /* const Navbar = () => {
    const classes = useStyles();
    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const handleAuth = () =>{
        if(user) {
            auth.singOut();
            dispatch({
                type: actionTypes.EMPTY_BASQUET,
                basket: [],
            });
            history.push("/");
        } 
    } */
  
  export default function Navbar(){
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className = {classes.appBar}> 
       <Toolbar>
            <Link to = "/">
                <IconButton>
                    <img
                        src={logo}
                        alt= 'Commerce.js'
                        height='70px'
                        className={classes.image}
                    />
                </IconButton>    
            </Link>

            <div className={classes.grow}/>
            <Typography variant='h6' color='textPrimary' component='p'>
              Hola Invitado
            </Typography>
            <div className={classes.button}>
              <Link to={"sigin"}>
                <Button>
                  <strong>{1>0 ? "Sign Out" : "Sign In"}</strong>
                </Button>
              </Link>
              <Link to="/checkout-page">
                <IconButton aria-label='mostrar items del carrito' color = "inherit">
                  <Badge badgeContent={5} color='secondary'>
                    <ShoppingCart fontSize='large' color="primary"/>
                  </Badge>
                </IconButton>
              </Link>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
