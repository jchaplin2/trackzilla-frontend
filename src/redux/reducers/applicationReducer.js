import {
  FETCH_APPLICATIONS_LOADING,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATIONS_FAILURE,
} from "../actions/applicationActions";

export default function applicationReducer(
  state = { data: "", error: "", loading: true },
  action
) {
  switch (action.type) {
    case FETCH_APPLICATIONS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case FETCH_APPLICATIONS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case FETCH_APPLICATIONS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
