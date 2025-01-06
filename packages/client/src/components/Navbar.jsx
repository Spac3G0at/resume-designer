import styled from "styled-components";
import { useCV } from "../CVContext";
import DownloadButton from "./DownloadButton";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { undo, redo, canRedo, canUndo, cv, updatePartial } = useCV();

  const [value, setValue] = useState(cv.name);

  useEffect(() => {
    setValue(cv.name);
  }, [cv.name]);

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleChange = () => {
    updatePartial({ name: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const backLink = window.history.length > 1 ? -1 : "/";

  return (
    <Root>
      <nav>
        <Link to={backLink}>Resume designer</Link>
        <Name
          value={value}
          onChange={onValueChange}
          onBlur={handleChange}
          onKeyDown={handleKeyDown}
        />
        <RedoUndoBtnGroup>
          <button disabled={!canUndo} onClick={undo}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
          <button disabled={!canRedo} onClick={redo}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </RedoUndoBtnGroup>
        <DownloadButton />
      </nav>
    </Root>
  );
};

export default Navbar;

const Root = styled.div`
  z-index: 11;
  position: relative;
  background-color: #333;
  color: white;
  /* padding: 10px; */
  width: 100%;
  & > nav {
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

const RedoUndoBtnGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  & > button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #555;
    color: white;
    cursor: pointer;
    &:disabled {
      color: grey;
      background-color: #1d1d1d;
      cursor: not-allowed;
    }
  }
`;

const Name = styled.input`
  max-width: 150px;
  width: 150px;
  margin-left: 20px;
  height: 20px;
  padding: 5px;
  overflow: hidden; /* Prevent text from overflowing */
  text-overflow: ellipsis; /* Show ellipsis when text overflows */
  white-space: nowrap; /* Prevent text from wrapping to the next line */
  border-color: var(--color);
  background: transparent; /* Optional, to make the background transparent */
`;
