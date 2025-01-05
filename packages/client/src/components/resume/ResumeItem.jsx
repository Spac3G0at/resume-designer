import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import moment from "moment";
import { useRef, useState } from "react";
import axios from "axios";

const ResumeItem = ({ resume, large, reload }) => {
  const lastUpdatedDate = new Date(resume.updatedAt);
  const relativeTime = moment(lastUpdatedDate).fromNow();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`resume/${id}`);
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
          <button onClick={onDuplicate}>DUPLICATE</button>
          <a href={`/cv/${resume._id}`} target="_blank">
            <button>VIEW</button>
          </a>
        </ButtonsGroup>
      </Infos>
      <ThreeDotsMenu onDelete={() => handleDelete(resume._id)} />
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

// -------------

const MenuWrapper = styled.div`
  position: absolute;
  display: inline-block;
  right: 0;
  top: 0px;
`;

const DotsButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
`;

const Popover = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #4c4c4c;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  min-width: 150px;
`;

const MenuItem = styled.button`
  padding: 10px;
  background: #b81010;
  cursor: pointer;
  &:hover {
    background: #8e0d0d;
  }
`;

const ThreeDotsMenu = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const askDelete = async () => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setLoading(true);
      await onDelete();
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MenuWrapper ref={menuRef}>
      <DotsButton onClick={toggleMenu}>⋮</DotsButton>
      {isOpen && (
        <Popover>
          <MenuItem disabled={loading} onClick={askDelete}>
            Delete
          </MenuItem>
        </Popover>
      )}
    </MenuWrapper>
  );
};
