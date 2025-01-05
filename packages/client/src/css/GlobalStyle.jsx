import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .name {
    color: ${({ theme }) => theme.name_color};
  }
   .title-text {
    color: ${({ theme }) => theme.title_color};
  }
  .resume-title {
    color: ${({ theme }) => theme.resume_title_color};
  }
  .company-label {
    color: ${({ theme }) => theme.company_color};
  }
`;

export default GlobalStyle;
