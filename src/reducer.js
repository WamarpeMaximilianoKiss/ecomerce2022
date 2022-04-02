export const initialState = {
    basket: [],
    user: null,
    userType: null,
    shippingData: {},
    categories: [],
    products: [],
    importeTotal: 0,
    productDetail: [],
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
    SET_PROD_DETAIL: "SET_PROD_DETAIL",
    REMOVE_ITEM_TOTAL: "REMOVE_ITEM_TOTAL",
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => (item.importe_venta * item.cantidad) + amount, 0);
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            //comprueba si ya existe
            var actual = state;
            var nuevo = action.item;

            if (actual != null) {

                if (state.basket.length > 0) {

                    var cant = 0;
                    for (let index = 0; index < state.basket.length; index++) {
                        const element = state.basket[index];
                        if (element.Id === action.item.Id) {
                            element.cantidad++;
                            cant++;
                        }

                    }
                    if (cant == 0) {
                        return {
                            ...state,
                            basket: [...state.basket, action.item],
                        };
                    }
                    else {

                        return {
                            ...state,
                            basket: [...state.basket],
                        };
                    }

                }
                else {

                    return {
                        ...state,
                        basket: [...state.basket, action.item],
                    };
                }

            }
        case "REMOVE_ITEM":
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
            let newBasket = [...state.basket];

            state.basket?.map((pro) => {
                if (pro.Id === action.id) {
                    if (pro.cantidad === 1) {
                        newBasket.splice(index, 1);
                    }
                    else {
                        pro.cantidad--;
                    }
                }
            });
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
        case "SET_PROD_DETAIL":
            return {
                ...state,
                productDetail: [action.item],
            };
        case "REMOVE_ITEM_TOTAL":
            const indexRemove = state.basket.findIndex(basketItem => basketItem.id === action.id);
            let basketAux = [...state.basket];
            basketAux.splice(indexRemove, 1);

            return {
                ...state,
                basket: basketAux,
            };
        default:
            console.log("default!!");
            return state;

    }
}

export default reducer