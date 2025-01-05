import styled from "styled-components";
import ColorPicker from "../ColorPicker";
import useSettings from "../hooks/useSettings";
import { useState } from "react";
import FontSelector from "./layout/FontSelector";

const LayoutMenu = () => {
  const { settings, update } = useSettings();

  const [size, setSize] = useState(settings.resume_scale_factor);
  const [titleSize, setTitleSize] = useState(
    settings.resume_title_scale_factor
  );
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleFactor = () => {
    update("resume_scale_factor", size);
  };

  const handleTitleFactor = () => {
    update("resume_title_scale_factor", titleSize);
  };

  const handleTitleSize = (e) => {
    setTitleSize(e.target.value);
  };

  return (
    <div>
      <h4>Colors / Margins / Font</h4>
      <ItemGroup>
        <span>Name color</span>
        <ColorPicker
          onChange={(color) => update("name_color", color)}
          baseColor={settings.name_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Resume title color</span>
        <ColorPicker
          onChange={(color) => update("resume_title_color", color)}
          baseColor={settings.resume_title_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Title color</span>
        <ColorPicker
          onChange={(color) => update("title_color", color)}
          baseColor={settings.title_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Display timeline</span>

        <label>
          <input
            type="radio"
            id="huey"
            name="drone"
            checked={settings.timeline}
            readOnly
            onClick={() => update("timeline", true)}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            id="dewey"
            name="drone"
            checked={!settings.timeline}
            readOnly
            onClick={() => update("timeline", false)}
          />
          No
        </label>
      </ItemGroup>

      <ItemGroup>
        <span>Font size</span>

        <input
          type="range"
          id="volume"
          name="volume"
          min="0.5"
          max="1.5"
          step="0.1"
          style={{ padding: 0 }}
          value={size}
          onMouseUp={handleFactor}
          onChange={handleSize}
        />
      </ItemGroup>
      <ItemGroup>
        <span>Title size</span>

        <input
          type="range"
          id="volume"
          name="volume"
          min="0.5"
          max="1.5"
          step="0.1"
          style={{ padding: 0 }}
          value={titleSize}
          onMouseUp={handleTitleFactor}
          onChange={handleTitleSize}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Font</span>
        <FontSelector />
      </ItemGroup>
    </div>
  );
};

export default LayoutMenu;

const ItemGroup = styled.div`
  display: flex;
  align-items: top;
  font-size: 14px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  span {
    padding-right: 10px;
    width: 50%;
  }
  label {
    input[type="radio"] {
      cursor: pointer;
    }
    cursor: pointer;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
