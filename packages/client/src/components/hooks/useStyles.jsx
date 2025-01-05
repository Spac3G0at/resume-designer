import { useCV } from "../../CVContext";

const useStyles = () => {
  const {
    cv: { settings },
  } = useCV();

  return {
    titleColor: settings.title_color,
    resumeTitleColor: settings.resume_title_color,
    nameColor: settings.name_color,
    companyColor: settings.company_color,
  };
};

export default useStyles;
