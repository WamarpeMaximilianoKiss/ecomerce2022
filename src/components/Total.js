import React from 'react';
import accounting from 'accounting';
import { Button, makeStyles } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router-dom';



const useStyle = makeStyles((theme) => ({
    root:  {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    button: {
        marginTop: "2rem"
    }
}))


const Total = () => {
    const classes = useStyle();
    const [{basket}, dispatch] = useStateValue();
    const navigate = useNavigate(); 
    const toCheckOut = () =>{
        navigate('/checkout')
    }
    
  return (
      <div className={classes.root} > 
        <h5>Total items: {basket?.length}</h5>
        <h5>{accounting.formatMoney(getBasketTotal(basket),"$")}</h5>
        <Button className={classes.button} variant="contained" color="secondary" onClick={toCheckOut} >Check out</Button>

     </div>
  )

};

export default Total;
