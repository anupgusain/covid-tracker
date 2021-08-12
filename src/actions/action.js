export const setData = (data) => ({
    type: "SET_DATA",
    data: data,
});

export const filterChange = (data) => ({
    type: "CHANGE_FILTER",
    data: { selected_filter: data.selected_filter, sort_data: data.new_data },
});
