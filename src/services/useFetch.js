import { useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
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
