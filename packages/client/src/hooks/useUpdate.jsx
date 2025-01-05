/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

const useUpdate = (data) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousData, setPreviousData] = useState(data);

  useEffect(() => {
    if (JSON.stringify(data) === JSON.stringify(previousData)) return;
    setPreviousData(data);

    const source = axios?.CancelToken?.source();

    (async () => {
      try {
        await axios.put(`resume/${data._id}`, data, {
          cancelToken: source?.token,
        });
        setLoading(false);
      } catch (err) {
        console.log("ERROR", err);
        setError(err);
        if (!err?.message) {
          setLoading(false);
        }
      }
    })();

    return () => {
      source?.cancel("Cancelled");
    };
  }, [data]);

  return { loading, error };
};

export default useUpdate;
