import { Outlet } from "react-router";
import styled from "styled-components";

const EmptyLayout = () => {
  return (
    <Root>
      <Outlet />
    </Root>
  );
};

export default EmptyLayout;

const Root = styled.div`
  padding: 32px;
  position: relative;
`;
