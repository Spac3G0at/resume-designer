import PageLoader from "./PageLoader";
import ResumeItem from "../components/resume/ResumeItem";
import Card from "../components/Card";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import NewResumeButton from "../components/NewResumeButton";

const ResumesPage = () => {
  const [reload, setReload] = useState(0);
  const { data, loading } = useFetch({ api: `resume`, reload });

  const handleReload = () => setReload((prev) => prev + 1);

  return (
    <div>
      {loading && <PageLoader />}
      <Content>
        {data?.map((resume) => (
          <Card key={resume._id}>
            <ResumeItem resume={resume} large reload={handleReload} />
          </Card>
        ))}
        {data?.length === 0 && !loading && (
          <div>
            <p>{"You don't have any resume yet."}</p>
            <NewResumeButton />
          </div>
        )}
      </Content>
    </div>
  );
};

export default ResumesPage;

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
`;
