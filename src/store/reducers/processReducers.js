const initialState = {
    processs: [],
    processLoading: false,
    processError: null,
};

export const processReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PROCESSS_REQUEST":
            return { ...state, processLoading: true };
        case "FETCH_PROCESSS_SUCCESS":
            return { ...state, processLoading: false, processs: action.payload };
        case "FETCH_PROCESSS_FAILURE":
            return { ...state, processLoading: false, processError: action.payload };
        case "ADD_ROLE_SUCCESS":
            return { ...state, processs: [...state.processs, action.payload] };
        case "UPDATE_ROLE_SUCCESS":
            return {
                ...state,
                processs: state.processs.map((process) =>
                    process.id === action.payload.id ? action.payload : process
                ),
            };
        case "DELETE_ROLE_SUCCESS":
            return {
                ...state,
                processs: state.processs.filter((process) => process.id !== action.payload),
            };
        default:
            return state;
    }
};