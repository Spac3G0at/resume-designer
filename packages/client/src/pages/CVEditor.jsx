import styled from "styled-components";
import Toolbar from "../components/Toolbar";
import CVGenerator from "../components/CVGenerator";
import Navbar from "../components/Navbar";
import ThemeProvider from "../css/ThemeProvider";
import { CVProvider } from "../CVContext";
import Modal from "../components/Modal";

import mock from "../assets/mock";
if (localStorage.getItem("cv") === null) {
  localStorage.setItem("cv", JSON.stringify(mock));
}

const cvData = JSON.parse(localStorage.getItem("cv") ?? JSON.stringify(mock));

const CVEditor = ({ editable = true, data = cvData }) => {
  return (
    <CVProvider editable={editable} data={data}>
      <ThemeProvider>
        <Root $editable={editable}>
          {editable && <Navbar />}
          <Content>
            {editable && <Toolbar />}
            <CVContainer>
              <CVGenerator />
            </CVContainer>
          </Content>
        </Root>
        {editable && <Modal />}
      </ThemeProvider>
    </CVProvider>
  );
};

export default CVEditor;

const Root = styled.div`
  min-height: ${({ $editable }) => ($editable ? "100vh" : "auto")};
`;

const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

const CVContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  flex: 1 1 0%;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-left: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 962px) {
    padding: 0;
  }
`;
