import {
  FETCH_RELEASES_LOADING,
  FETCH_RELEASES_SUCCESS,
  FETCH_RELEASES_FAILURE,
  ADD_RELEASE,
  CHANGE_RELEASE,
  DELETE_RELEASE,
} from "../actions/releaseActions";

export default function releaseReducer(
  state = { data: "", error: "", loading: true },
  action
) {
  switch (action.type) {
    case FETCH_RELEASES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case FETCH_RELEASES_SUCCESS:
    case CHANGE_RELEASE:
    case ADD_RELEASE:
    case DELETE_RELEASE:
      return {
        ...state,
        data: action.data,
      };
    case FETCH_RELEASES_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
