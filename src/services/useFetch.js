import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AuthContext from "../store/auth-context";

export function useFetchWithRedux(url, actions, selector) {
  const {
    fetchLoading,
    fetchError,
    fetchSuccess,
  } = actions;

  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function init() {
      fetchLoading(true, dispatch);
      const baseUrl = process.env.REACT_APP_BASE_API_URL;
      const options = {
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        }),
      };
      await fetch(baseUrl + url, options)
        .then((response) => response.json())
        .then((data) => {
          fetchSuccess(data, dispatch);
        })
        .catch((error) => {
          fetchError(error, dispatch);
        })
        .finally(() => {
          fetchLoading(false, dispatch);
        });
    }

    init();
  }, [
    url,
    dispatch,
    fetchError,
    fetchLoading,
    fetchSuccess,
    authCtx.token,
  ]);

  const reducer = useSelector((state) => state[selector]);
  return { reducer };
}

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const baseUrl = process.env.REACT_APP_BASE_API_URL;
      await fetch(baseUrl + url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    init();
  }, [url]);

  return { data, error, loading };
}
