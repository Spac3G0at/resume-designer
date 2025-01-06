import React, { useRef, useState } from "react";
import styled from "styled-components";

const ResumeDotMenu = ({ onDelete }) => {
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
      <DotsButton onClick={toggleMenu}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </DotsButton>
      {isOpen && (
        <Popover>
          <MenuItem disabled={loading} onClick={askDelete}>
            DELETE
          </MenuItem>
        </Popover>
      )}
    </MenuWrapper>
  );
};

export default ResumeDotMenu;

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
