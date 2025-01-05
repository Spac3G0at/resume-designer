import styled from "styled-components";

const Icon = ({ icon }) => {
  return <Root>{icon}</Root>;
};

export default Icon;

const Root = styled.span`
  font-family: "FontAwesome";
  font-size: 15px;
  margin-right: 10px;
`;
