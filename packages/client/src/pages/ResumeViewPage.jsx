import { Link, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import DownloadButton from "../components/DownloadButton";
import CVEditor from "./CVEditor";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import Loader from "./Loader";

const ResumeViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch({ api: `resume/${id}` });

  useEffect(() => {
    if (error && error?.code !== "ERR_CANCELED") {
      navigate("/404", { replace: true });
    }
  }, [error, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <Link to="/">
        <ButtonHome>Home</ButtonHome>
      </Link>
      <ButtonFloat>
        <DownloadButton />
      </ButtonFloat>
      <Content style={{ marginTop: "50px" }}>
        {!loading && data && <CVEditor data={data} editable={false} />}
      </Content>
    </>
  );
};

export default ResumeViewPage;

const ButtonFloat = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  z-index: 5;
`;

const Content = styled.div`
  margin-top: 50px;
`;

const ButtonHome = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`;
