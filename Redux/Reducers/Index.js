import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";

const allReducers = combineReducers({
    // import reducers here
    currentUser: currentUserReducer
});

export default allReducers;