import { useState } from "react";
import styled from "styled-components";
import useSettings from "../../hooks/useSettings";

// Styled components
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FontSelect = styled.select`
  font-family: ${(props) => props.$selectedFont}, sans-serif;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const Option = styled.option`
  font-family: ${(props) => props.fontFamily}, sans-serif;
`;

const FontSelector = () => {
  const {
    update,
    settings: { font },
  } = useSettings();
  const [selectedFont, setSelectedFont] = useState(font);

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    update("font", event.target.value);
  };

  const options = ["Lato", "DynaPuff", "sans-serif"];

  return (
    <SelectContainer>
      <FontSelect
        $selectedFont={selectedFont}
        onChange={handleFontChange}
        value={selectedFont}
      >
        {options.map((option) => (
          <Option key={option} fontFamily={option} value={option}>
            {option}
          </Option>
        ))}
      </FontSelect>
    </SelectContainer>
  );
};

export default FontSelector;
