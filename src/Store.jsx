import React from "react";

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_SIGNIN":
            return { ...state, userInfo: action.payload };
        case "USER_SIGNOUT":
            return { ...state, userInfo: '' };
        case "ADD_COURSE":
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    enrolledCourseIds: [...state.userInfo.enrolledCourseIds, action.payload]
                }
            };
        case "REMOVE_COURSE":
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    enrolledCourseIds: state.userInfo.enrolledCourseIds.filter(
                        courseId => courseId !== action.payload
                    )
                }
            };
        default:
            return state;
    }
};

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
