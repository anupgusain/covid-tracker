const initial_state = {
    datalist: [],
    filter_value: "",
    sort_data: [],
    loader: false,
};
export const indexReducer = (state = initial_state, action) => {
    const newState = Object.assign({}, state);
    if (action.type === "SET_DATA") {
        newState.datalist = [...action.data];
        return newState;
    }
    if (action.type === "CHANGE_FILTER") {
        newState.filter_value = action.data.selected_filter;
        if (action.data.selected_filter === "reset") {
            newState.sort_data = [];
        } else {
            newState.sort_data = action.data.sort_data;
            return newState;
        }
    }
    if (action.type === "SET_LOADER") {
        newState.loader = action.data;
        return newState;
    }

    return state;
};
