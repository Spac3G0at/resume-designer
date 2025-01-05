import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (api, cancelFirstCall = false, formatter = (data) => data) => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(true);
  const [firstCall, setFirstCall] = useState(cancelFirstCall);

  const handleResponse = (res) => {
    setData(formatter(res?.data));
    setResponse(res);
  };

  const resetFetch = () => {
    setData(null);
    setResponse(null);
    setLoading(true);
    setError(null);
    setMounted(true);
  };

  useEffect(() => {
    setFirstCall(false);
    if (firstCall) return;

    resetFetch();

    const source = axios?.CancelToken?.source();

    (async () => {
      try {
        const res = await axios.get(api, {
          cancelToken: source?.token,
        });
        handleResponse(res);
        setLoading(false);
      } catch (err) {
        setError(err);
        if (!err?.message) {
          setLoading(false);
        }
      }
    })();

    return () => {
      setMounted(false);
      source?.cancel("Cancelled");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);
  if (mounted) return { data, loading, error, response };
};
export default useFetch;
