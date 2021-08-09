const initial_state = {
    value: 0,
};
export const calculationReducer = (state = initial_state, action) => {
    const newState = Object.assign({}, state);
    if (action.type === "INCREMENT") {
        newState.value = action.value + newState.value;
        return newState;
    }
    if (action.type === "DECREMENT") {
        newState.value = state.value - 1;
        return newState;
    }
    return state;
};
