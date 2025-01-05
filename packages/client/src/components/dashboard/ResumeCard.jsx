import styled from "styled-components";
import Card from "../Card";
import { Link } from "react-router";
import PageLoader from "../../pages/PageLoader";
import useFetch from "../../hooks/useFetch";
import NewResumeButton from "../NewResumeButton";
import moment from "moment";

const ResumeCard = () => {
  const { data, loading } = useFetch({ api: "resume/last-3" });

  return (
    <Card>
      {loading && <PageLoader />}
      <Header>
        <h3>My resumes</h3>
        {data?.length > 0 && (
          <div>
            <NewResumeButton />
          </div>
        )}
      </Header>

      <div>
        {data?.map((resume) => (
          <ResumeItem key={resume._id} resume={resume} />
        ))}

        {data?.length === 0 && (
          <NoResumeCtn>
            <p>{"You don't have any resume yet."}</p>
            <NewResumeButton />
          </NoResumeCtn>
        )}
      </div>

      {data?.length > 0 && (
        <Footer>
          <Link to="/resumes">See all</Link>
        </Footer>
      )}
    </Card>
  );
};

export default ResumeCard;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  button {
    background: #ed2553;
    font-size: 14px;
  }
  h3 {
    margin: 0;
  }
`;

const NoResumeCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 16px;
`;

const ResumeItem = ({ resume }) => {
  const lastUpdatedDate = new Date(resume.updatedAt);
  const relativeTime = moment(lastUpdatedDate).fromNow();

  return (
    <ResumeItemRoot>
      <img src={"https://placehold.co/65x91"} alt={resume.name} />
      <Infos>
        <Link to={`/cv-editor/${resume._id}`}>{resume.name}</Link>
        <small>Updated {relativeTime}</small>
        <ButtonsGroup>
          <Link to={`/cv-editor/${resume._id}`}>
            <button>EDIT</button>
          </Link>
          <button>DUPLICATE</button>
          <a href={`/cv/${resume._id}`} target="_blank">
            <button>VIEW</button>
          </a>
        </ButtonsGroup>
      </Infos>
    </ResumeItemRoot>
  );
};

const ResumeItemRoot = styled.div`
  display: flex;
  img {
    margin-right: 12px;
    border-radius: 4px;
  }
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  margin-top: 10px;
  a {
    margin-right: 8px;
    &:first-of-type {
      button {
        border: 1px solid white;
      }
    }
    button {
      margin: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  button {
    font-weight: bold;
    background: none;
    padding: 3px 5px;
    margin-right: 8px;
  }
`;
