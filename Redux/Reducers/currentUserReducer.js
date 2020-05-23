const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_USER':
            return state = action.load;
        default:
            return state;
    }
};

export default currentUserReducer;