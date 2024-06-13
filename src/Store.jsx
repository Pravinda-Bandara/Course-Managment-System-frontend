import React from "react";

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_SIGNIN":
            return { ...state, userInfo: action.payload }
        case "USER_SIGNOUT":
            return {...state,userInfo:''}
        default:
            return state;
    }
}

const defaultDispatch = () => initialState;

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
});

function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
