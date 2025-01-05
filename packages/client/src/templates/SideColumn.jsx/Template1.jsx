import styled from "styled-components";
import DragBlocks from "../../components/draggables/DragBlocks";
import { useEffect, useMemo, useState } from "react";
import ExperiencesBlocks from "../../components/experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import Template1Header from "./Template1Header";
import Icon from "../../components/Icon";
import SkillsBlocks from "../../components/skills/SkillsBlocks";

const Template1 = () => {
  const { cv, updateMain } = useCV();

  const main = useMemo(() => cv.main, [cv.main]);

  const [blocks, setBlocks] = useState(handleBlocksMain(main));

  useEffect(() => {
    setBlocks(handleBlocksMain(main));
  }, [main]);

  useEffect(() => {
    updateMain(blocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  return (
    <Root>
      <SideBar>
        <SideContainer>
          <p>
            <Icon icon={"\uf0e0"} />
            {cv.email}
          </p>
        </SideContainer>
      </SideBar>
      <Main>
        <Template1Header />

        <Content>
          <AddBlockSelector container={"main"} />
          <DragBlocks main items={blocks} onReorder={setBlocks} />
        </Content>
      </Main>
    </Root>
  );
};

export default Template1;

const Main = styled.div`
  padding: 30px 36px;
  width: 100%;
`;

const Root = styled.div`
  font-size: 12px;
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const SideBar = styled.div`
  width: 218px;
  background-color: #333333;
  border-right: 1px solid #333333;
  color: #e4e4e4;
  max-width: 300px;
  min-width: 218px;
`;

const SideContainer = styled.div`
  padding: 38px 36px;
`;

const getMainComponent = (type, data, title, groupId) => {
  switch (type) {
    case "experiences":
      return <ExperiencesBlocks groupId={groupId} title={title} data={data} />;
    case "education":
      return <ExperiencesBlocks groupId={groupId} title={title} data={data} />;
    case "skills":
      return <SkillsBlocks groupId={groupId} title={title} data={data} />;
    default:
      return null;
  }
};

const handleBlocksMain = (main) => {
  const arr = main.map((item) => {
    return {
      id: item.id,
      title: item.title,
      content: getMainComponent(item.type, item.data, item.title, item.id),
    };
  });

  return arr;
};

const AddBlockSelector = ({ container }) => {
  const { addingBlock, addBlock } = useCV();
  const active = addingBlock?.canAdd.includes(container);
  const handleAdd = () => {
    addBlock(container);
  };

  return (
    <SelectorRoot $active={active}>
      <div>
        <button onClick={handleAdd}>Add here</button>
      </div>
    </SelectorRoot>
  );
};

const SelectorRoot = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  padding: 10px;
  justify-content: center;
  display: ${({ $active }) => ($active ? "flex" : "none")};
  min-height: 70px;
  div {
    margin-top: 20px;
  }
  button {
    background: white;
    color: black;
  }
`;
