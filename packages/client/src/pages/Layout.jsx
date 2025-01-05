import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";
import styled from "styled-components";
import { logoutUser } from "../features/auth/authActions";

const Layout = () => {
  return (
    <Root>
      <Side />
      <Main>
        <Outlet />
      </Main>
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  display: flex;
`;

const padding = 24;
const navHeight = 50;
const Main = styled.main`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - ${padding * 2}px);
  padding: ${padding}px 32px;
  width: 100%;
  margin-left: 230px;
  @media screen and (max-width: 768px) {
    padding-top: ${() => navHeight + padding}px;
    min-height: calc(100vh - ${navHeight + padding * 2}px);
    margin-left: 0px;
  }
`;

const Side = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);
  const location = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    return () => {
      close();
    };
  }, [location]);

  return (
    <>
      <SideRoot $open={open}>
        <p>Resume creator</p>
        <Nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/resumes">Resumes</Link>
        </Nav>
        <Footer>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </Footer>
      </SideRoot>
      <Navbar>
        <nav>
          <div>
            <BurgerButton isMenuOpen={open} toggleMenu={toggle} />
          </div>
        </nav>
      </Navbar>
      <Overlay onClick={close} $open={open} />
    </>
  );
};

const SideRoot = styled.div`
  height: calc(100vh - 20px);
  width: 210px;
  min-width: 210px;
  background: #333333;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: fixed;
  @media screen and (max-width: 768px) {
    left: ${({ $open }) => ($open ? "0" : "-230px")};
  }
`;

const Navbar = styled.div`
  display: none;
  background: #333333;
  height: 50px;
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: inherit;
  }
  nav {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1e1e1ead;
  z-index: 4;
  @media screen and (max-width: 768px) {
    display: ${({ $open }) => ($open ? "inherit" : "none")};
  }
`;

const Nav = styled.nav`
  display: list;
  padding-top: 20px;
  > a {
    display: list-item;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Footer = styled.nav`
  margin-top: auto;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;

const BurgerButton = ({ isMenuOpen, toggleMenu }) => {
  return (
    <StyledBurgerButton onClick={toggleMenu} aria-expanded={isMenuOpen}>
      <div />
      <div />
      <div />
    </StyledBurgerButton>
  );
};

// Styled components
const StyledBurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  div {
    width: 100%;
    height: 4px;
    background: #fff;
    border-radius: 2px;
  }
`;
