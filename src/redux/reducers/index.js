import { combineReducers } from "redux";
import releaseReducer from "./releaseReducer";
import applicationReducer from "./applicationReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  releaseReducer,
  applicationReducer,
  ticketReducer,
});

export default rootReducer;
