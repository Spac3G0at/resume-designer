import { ThemeProvider as TProdider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { useMemo } from "react";
import { useCV } from "../CVContext";

const ThemeProvider = ({ children }) => {
  const {
    cv: { settings },
  } = useCV();

  const styles = useMemo(
    () => ({
      title_color: settings.title_color,
      resume_title_color: settings.resume_title_color,
      name_color: settings.name_color,
      company_color: settings.company_color,
    }),
    [settings]
  );

  return (
    <TProdider theme={styles}>
      <GlobalStyle />
      {children}
    </TProdider>
  );
};

export default ThemeProvider;
