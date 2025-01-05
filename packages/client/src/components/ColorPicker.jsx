import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

const ColorPicker = ({ baseColor = "#ffffff", onChange }) => {
  const [color, setColor] = useState(baseColor); // Initial color is white
  const colorInputRef = useRef(null); // Ref for the hidden color input

  useEffect(() => {
    setColor(baseColor); // Update the color when the baseColor prop changes
  }, [baseColor]);

  // Handle color change
  const handleInputChange = (event) => {
    setColor(event.target.value);
  };

  // Open the color input dialog when the div is clicked
  const handleDivClick = () => {
    colorInputRef.current.click(); // Trigger the color input dialog
  };

  // Update the color on blur
  useLayoutEffect(() => {
    if (!colorInputRef.current) return;
    const logEvent = (e) => {
      onChange(e.target.value);
    };
    const inputElement = colorInputRef.current;
    inputElement.addEventListener("change", logEvent, false);
    return () => {
      inputElement.removeEventListener("change", logEvent);
    };
  }, [colorInputRef, onChange]);

  return (
    <Root>
      <Display $color={color} onClick={handleDivClick}></Display>

      {/* Hidden color input (will trigger the picker when the div is clicked) */}
      <Picker
        ref={colorInputRef}
        type="color"
        value={color}
        onChange={handleInputChange}
      />
    </Root>
  );
};

export default ColorPicker;

const Root = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
`;

const Display = styled.div`
  width: 26px;
  height: 20px;
  border: 1px solid white;
  cursor: pointer;
  background-color: ${({ $color }) => $color};
`;

const Picker = styled.input`
  display: none;
`;
