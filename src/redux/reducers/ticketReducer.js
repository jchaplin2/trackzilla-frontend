import {
  FETCH_TICKETS_LOADING,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from "../actions/ticketActions";

export default function ticketReducer(
  state = { data: "", error: "", loading: true },
  action
) {
  switch (action.type) {
    case FETCH_TICKETS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
