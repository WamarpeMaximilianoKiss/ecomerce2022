export const initialState = {
    basket: [],
    user: null,
    userType: null,
    shippingData: {},
    categories: [],
    products: []
}

export const actionType = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    SET_USER_TYPE: "SET_USER_TYPE",
    EMTY_BASKET: "EMPTY_BASKET",
    SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
    SET_CATEGORIES: "SET_CATEGORIES",
    SET_PROD_CAT: "SET_PROD_CAT",
}

export const getBasketTotal = (basket) => {
    console.log(basket);
    return basket?.reduce((amount, item) => item.price + amount, 0)
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
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
        case "SET_USER_TYPE":
            return {
                ...state,
                userType: action.userType,
            };
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: action.basket
            };
        case "SET_SHIPPINGDATA":
            return {
                ...state,
                shippingData: action.shippingData
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.categories
            };
        case "SET_PROD_CAT":
            return {
                ...state,
                products: action.products
            };
        default:
            console.log("default!!");
            return state;

    }
}

export default reducer