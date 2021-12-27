export const FETCH_APPLICATIONS_LOADING =
  "FETCH_APPLICATIONS_LOADING";
export const FETCH_APPLICATIONS_SUCCESS =
  "FETCH_APPLICATIONS_SUCCESS";
export const FETCH_APPLICATIONS_FAILURE =
  "FETCH_APPLICATIONS_FAILURE";

export function fetchLoading(loading, dispatch) {
  dispatch({ type: FETCH_APPLICATIONS_LOADING, loading });
}

export function fetchSuccess(data, dispatch) {
  dispatch({ type: FETCH_APPLICATIONS_SUCCESS, data });
}

export function fetchError(error, dispatch) {
  dispatch({
    type: FETCH_APPLICATIONS_FAILURE,
    error,
  });
}
