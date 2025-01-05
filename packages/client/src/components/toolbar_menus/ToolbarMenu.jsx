import styled from "styled-components";
import LayoutMenu from "./LayoutMenu";
import TemplateMenu from "./TemplateMenu";
import BlocksMenu from "./BlocksMenu";

const ToolbarMenu = ({ open, menuType, toggleOpen }) => {
  return (
    <>
      <Handle className={`${open ? "open" : ""}`} onClick={toggleOpen}>
        <i className="fa-solid fa-caret-right"></i>
      </Handle>

      <Menu className={`${open ? "open" : ""}`}>
        <Content>
          <Currentmenu menu={menuType} />
        </Content>
      </Menu>
    </>
  );
};

const Currentmenu = ({ menu }) => {
  switch (menu) {
    case "layout":
      return <LayoutMenu />;
    case "template":
      return <TemplateMenu />;
    case "blocks":
      return <BlocksMenu />;
    default:
      return null;
  }
};

export default ToolbarMenu;

const Menu = styled.div`
  z-index: 10;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  background-color: #4c4c4c;
  color: white;
  height: 100vh;
  width: 350px;
  left: -261px;
  border-right: 1px solid grey;
  transition: left 0.3s ease;
  &.open {
    left: 90px;
  }
`;

const Handle = styled.button`
  position: fixed;
  background-color: #4c4c4c;
  color: white;
  border: 1px solid grey;
  border-left: none;
  left: 90px;
  top: 50%; /* Position it 50% from the top of the viewport */
  height: 100px;
  width: 20px;
  border-radius: 0 5px 5px 0;
  transition: left 0.3s ease;
  cursor: pointer;
  transform: translateY(-50%); /* This vertically centers the element */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  padding: 0 3px 0px 0px;
  i {
    transition: transform 0.3s ease;
  }
  &.open {
    left: calc(90px + 350px); /* Adjust this when the menu opens */
    i {
      transform: rotate(-180deg);
    }
  }
`;

const Content = styled.div`
  padding: 10px;
  position: relative;
  width: 100%;
`;
