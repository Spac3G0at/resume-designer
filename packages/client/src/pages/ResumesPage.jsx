import PageLoader from "./PageLoader";
import ResumeItem from "../components/resume/ResumeItem";
import Card from "../components/Card";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const ResumesPage = () => {
  const { data, loading } = useFetch("resume");

  return (
    <div>
      {loading && <PageLoader />}
      <Content>
        {data?.map((resume) => (
          <Card key={resume._id}>
            <ResumeItem resume={resume} large />
          </Card>
        ))}
      </Content>
    </div>
  );
};

export default ResumesPage;

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
`;
