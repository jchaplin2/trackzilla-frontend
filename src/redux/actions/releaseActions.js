export const FETCH_RELEASES_LOADING =
  "FETCH_RELEASES_LOADING";
export const FETCH_RELEASES_SUCCESS =
  "FETCH_RELEASES_SUCCESS";
export const FETCH_RELEASES_FAILURE =
  "FETCH_RELEASES_FAILURE";

export const ADD_RELEASE = "ADD_RELEASE";
export const CHANGE_RELEASE = "CHANGE_RELEASE";
export const DELETE_RELEASE = "DELETE_RELEASE";

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

export function updateRelease(data, dispatch) {
  dispatch({ type: CHANGE_RELEASE, data });
}

export function addRelease(data, dispatch) {
  dispatch({ type: ADD_RELEASE, data });
}

export function deleteRelease(data, dispatch) {
  dispatch({ type: DELETE_RELEASE, data });
}
