import { Link } from "react-router";
import styled from "styled-components";
import moment from "moment";

const ResumeItem = ({ resume, large }) => {
  const lastUpdatedDate = new Date(resume.updatedAt);
  const relativeTime = moment(lastUpdatedDate).fromNow();

  return (
    <ResumeItemRoot>
      <img
        src={`https://placehold.co/${large ? 150 : 65}x${large ? 210 : 91}`}
        alt={resume.name}
      />
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

export default ResumeItem;

const ResumeItemRoot = styled.div`
  display: flex;
  img {
    margin-right: 12px;
    border-radius: 4px;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsGroup = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
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
