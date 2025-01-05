import styled from "styled-components";
import Card from "../Card";
import { Link } from "react-router";
import PageLoader from "../../pages/PageLoader";
import useFetch from "../../hooks/useFetch";
import NewResumeButton from "../NewResumeButton";
import moment from "moment";
import axios from "axios";
import { useState } from "react";
import ResumeDotMenu from "../resume/ResumeDotMenu";

const ResumeCard = () => {
  const [reload, setReload] = useState(0);
  const { data, loading } = useFetch({ api: "resume/last-3", reload });

  const handleReload = () => setReload((prev) => prev + 1);

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
          <ResumeItem key={resume._id} resume={resume} reload={handleReload} />
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

const ResumeItem = ({ resume, reload }) => {
  const lastUpdatedDate = new Date(resume.updatedAt);
  const relativeTime = moment(lastUpdatedDate).fromNow();

  const onDuplicate = async () => {
    try {
      await axios.post(`resume/${resume._id}/duplicate`);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`resume/${resume._id}`);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ResumeItemRoot>
      <Link to={`/cv-editor/${resume._id}`}>
        <img
          width="65px"
          src={`/img/templates/${resume.settings.template}.jpg`}
          alt={resume.name}
        />
      </Link>
      <Infos>
        <Link to={`/cv-editor/${resume._id}`}>{resume.name}</Link>
        <small>Updated {relativeTime}</small>
        <ButtonsGroup>
          <Link to={`/cv-editor/${resume._id}`}>
            <button>EDIT</button>
          </Link>
          <button onClick={onDuplicate}>DUPLICATE</button>
          <a href={`/cv/${resume._id}`} target="_blank">
            <button>VIEW</button>
          </a>
        </ButtonsGroup>
      </Infos>
      <ResumeDotMenu onDelete={handleDelete} />
    </ResumeItemRoot>
  );
};

const ResumeItemRoot = styled.div`
  display: flex;
  position: relative;
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
