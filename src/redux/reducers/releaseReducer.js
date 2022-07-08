import {
  FETCH_RELEASES_LOADING,
  FETCH_RELEASES_SUCCESS,
  FETCH_RELEASES_FAILURE,
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
