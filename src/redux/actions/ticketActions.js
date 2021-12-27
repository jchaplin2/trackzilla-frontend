export const FETCH_TICKETS_LOADING =
  "FETCH_TICKETS_LOADING";
export const FETCH_TICKETS_SUCCESS =
  "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE =
  "FETCH_TICKETS_FAILURE";

export function fetchLoading(loading, dispatch) {
  dispatch({ type: FETCH_TICKETS_LOADING, loading });
}

export function fetchSuccess(data, dispatch) {
  dispatch({ type: FETCH_TICKETS_SUCCESS, data });
}

export function fetchError(error, dispatch) {
  dispatch({
    type: FETCH_TICKETS_FAILURE,
    error,
  });
}
