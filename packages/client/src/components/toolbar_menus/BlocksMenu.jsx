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
      icon: <i className="fa-solid fa-briefcase"></i>,
    },
    {
      id: "education",
      name: "Education",
      type: "education",
      canAdd: ["main"],
      icon: <i className="fa-solid fa-graduation-cap"></i>,
    },
    {
      id: "skills",
      name: "Skills",
      type: "skills",
      canAdd: ["main"],
      icon: <i className="fa-solid fa-shapes"></i>,
    },
    {
      id: "infos",
      name: "Infos",
      type: "infos",
      canAdd: ["side"],
      icon: <i className="fa-solid fa-circle-info"></i>,
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
          {option.icon}
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
  display: flex;
  align-items: center;
  i {
    margin-right: 10px;
  }
`;
