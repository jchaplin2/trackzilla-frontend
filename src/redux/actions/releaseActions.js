export const FETCH_RELEASES_LOADING =
  "FETCH_RELEASES_LOADING";
export const FETCH_RELEASES_SUCCESS =
  "FETCH_RELEASES_SUCCESS";
export const FETCH_RELEASES_FAILURE =
  "FETCH_RELEASES_FAILURE";

export function fetchLoading(loading, dispatch) {
  dispatch({ type: FETCH_RELEASES_LOADING, loading });
}

export function fetchSuccess(data, dispatch) {
  dispatch({ type: FETCH_RELEASES_SUCCESS, data });
}

export function fetchError(error, dispatch) {
  dispatch({
    type: FETCH_RELEASES_FAILURE,
    error,
  });
}
