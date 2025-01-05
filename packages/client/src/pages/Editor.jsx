import { useEffect } from "react";
import CVEditor from "./CVEditor";
import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch({ api: `resume/${id}` });

  useEffect(() => {
    if (error && error?.code !== "ERR_CANCELED") {
      navigate("/404", { replace: true });
    }
  }, [error, navigate]);

  if (loading || !data) return <Loader />;

  return <CVEditor data={data} editable={true} />;
};

export default Editor;
