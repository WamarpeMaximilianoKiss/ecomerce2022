export const initialState = {
    basket: [],
    user: null
}

export const actionType = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMTY_BASKET: "EMPTY_BASKET"
}

export const getBasketTotal = (basket) => {
    console.log(basket);
    return basket?.reduce((amount,item) => item.price + amount,0)
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
        return {
            ...state,
            basket: [...state.basket,action.item],
        };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
            let newBasket = [...state.basket];
            if(index>=0){
                newBasket.splice(index,1);
            }else{
                console.log("No se puede eliminar el producto")
            }
        return {
            ...state,
            basket: newBasket,
        };
        case "SET_USER":
        return {
            ...state,
            user: action.user,
        };
        case "EMPTY_BASKET":
        return {
            ...state,
           basket: action.basket
        };
        default: 
        console.log("default!!");
        return state;
    
    }
}

export default reducer