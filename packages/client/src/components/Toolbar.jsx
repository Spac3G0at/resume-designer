import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import ToolbarMenu from "./toolbar_menus/ToolbarMenu";

const Toolbar = () => {
  const tools = [
    {
      type: "template",
      icon: "fa-solid fa-file-lines",
      label: "Template",
    },
    {
      type: "layout",
      icon: "fa-solid fa-paintbrush",
      label: "Layout",
    },
    {
      type: "blocks",
      icon: "fa-solid fa-plus",
      label: "Add a block",
    },
  ];

  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState("layout");

  const toolbarRef = useRef(null); // Create a ref for the Root component

  // Toggle the menu's open state
  const toggleMenu = () => {
    setOpen((c) => !c);
  };

  // Set the menu type and toggle the menu
  const openWithType = (type) => {
    type === menuType ? toggleMenu() : setOpen(true);
    setMenuType(type);
  };

  // Close the menu if a click happens outside the toolbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setOpen(false); // Close the menu if the click is outside the toolbar
      }
    };

    // Add event listener for click events
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Root ref={toolbarRef}>
        <Content>
          <Tools>
            {tools.map((tool) => (
              <ToolButton
                key={tool.label}
                $active={String(menuType === tool.type)}
                onClick={() => openWithType(tool.type)}
              >
                <i className={tool.icon}></i>
                <span>{tool.label}</span>
              </ToolButton>
            ))}
          </Tools>
          <Background />
          <ToolbarMenu
            toggleOpen={toggleMenu}
            menuType={menuType}
            open={open}
          />
        </Content>
      </Root>
    </>
  );
};

export default Toolbar;

const Root = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: column;
  width: 90px;
  z-index: 5;
  @media (max-width: 962px) {
    display: none;
  }
`;

const Content = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  height: fit-content;
`;

const Tools = styled.div`
  z-index: 12;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  z-index: 11;
  background: #333;
  width: 100%;
  height: 100vh;
`;

const ToolButton = styled.button`
  background: none;
  font-weight: normal;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin-top: 10px;
  padding: 5px;
  span {
    margin-top: 5px;
  }
  i {
    font-size: 20px;
  }
  border: none;

  /* Active state styling */
  color: ${({ $active }) =>
    $active === "true" ? "#ed2553" : "white"}; /* Set active bg color */
`;
