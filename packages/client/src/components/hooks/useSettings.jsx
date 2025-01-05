import { useCV } from "../../CVContext";

const useSettings = () => {
  const { settings, updateSettings } = useCV();

  const update = (property, value) => {
    updateSettings({ [property]: value });
  };

  return { settings, update };
};

export default useSettings;
