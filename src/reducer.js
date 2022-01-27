export const initialState = {
    basket: []
}

export const actionType = {
    ADD_TO_BASKET: "ADD_TO_BASKET"
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
        return {
            ...state,
            basket: [...state.basket,action.item],
        };
        default: 
        console.log("default!!");
        return state;
    
    }
}

export default reducer