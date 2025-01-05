import styled from "styled-components";
import { useCV } from "../../CVContext";
import { useEffect } from "react";

const BlocksMenu = () => {
  const { addingBlock, setAddingBlock } = useCV();

  const options = [
    {
      id: "experience",
      name: "Experience",
      type: "experiences",
      canAdd: ["main"],
    },
    {
      id: "education",
      name: "Education",
      type: "education",
      canAdd: ["main"],
    },
    {
      id: "skills",
      name: "Skills",
      type: "skills",
      canAdd: ["main"],
    },
    {
      id: "infos",
      name: "Infos",
      type: "infos",
      canAdd: ["side"],
    },
  ];

  const handleSelect = (block) => {
    setAddingBlock(block?.id === addingBlock?.id ? null : block);
  };

  useEffect(() => {
    return () => {
      setAddingBlock(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      {options.map((option) => (
        <BlockButton
          $current={addingBlock?.id === option?.id}
          key={option.type}
          onClick={() => handleSelect(option)}
        >
          {option.name}
        </BlockButton>
      ))}
    </Root>
  );
};

export default BlocksMenu;

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const BlockButton = styled.button`
  color: ${({ $current }) => ($current ? "grey" : "white")};
`;
