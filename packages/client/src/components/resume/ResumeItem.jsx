import { Link } from "react-router";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import ResumeDotMenu from "./ResumeDotMenu";

const ResumeItem = ({ resume, large, reload }) => {
  const lastUpdatedDate = new Date(resume.updatedAt);
  const relativeTime = moment(lastUpdatedDate).fromNow();

  const handleDelete = async () => {
    try {
      await axios.delete(`resume/${resume._id}`);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onDuplicate = async () => {
    try {
      await axios.post(`resume/${resume._id}/duplicate`);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ResumeItemRoot>
      <Link to={`/cv-editor/${resume._id}`}>
        <img
          width={`${large ? 150 : 65}px`}
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

export default ResumeItem;

const ResumeItemRoot = styled.div`
  display: flex;
  position: relative;
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
