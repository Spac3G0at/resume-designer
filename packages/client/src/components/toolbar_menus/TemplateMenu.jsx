import styled from "styled-components";
import useSettings from "../hooks/useSettings";

const TemplateMenu = () => {
  const {
    settings: { template },
    update,
  } = useSettings();

  const options = [
    {
      name: "Default",
      value: "default",
    },
    {
      name: "Top Infos",
      value: "topinfos",
    },
  ];
  return (
    <Root>
      {options.map((option) => (
        <TemplateButton
          key={option.value}
          $current={template === option.value}
          onClick={() => update("template", option.value)}
        >
          {option.name}
        </TemplateButton>
      ))}
    </Root>
  );
};

export default TemplateMenu;

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const TemplateButton = styled.button`
  color: ${({ $current }) => ($current ? "grey" : "white")};
`;
