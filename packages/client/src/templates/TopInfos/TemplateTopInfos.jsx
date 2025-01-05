import styled from "styled-components";
import DragBlocks from "../../components/draggables/DragBlocks";
import { useEffect, useMemo, useState } from "react";
import ExperiencesBlocks from "../../components/experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import TemplateTopInfosHeader from "./TemplateTopInfosHeader";
import Icon from "../../components/Icon";
import SkillsBlocks from "../../components/skills/SkillsBlocks";

const TemplateTopInfos = () => {
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
      <TopInfos>
        <SideContainer>
          <p>
            <Icon icon={"\uf0e0"} />
            {cv.email}
          </p>
        </SideContainer>
      </TopInfos>
      <Main>
        <TemplateTopInfosHeader />

        <Content>
          <DragBlocks main items={blocks} onReorder={setBlocks} />
        </Content>
      </Main>
    </Root>
  );
};

export default TemplateTopInfos;

const Main = styled.div`
  padding: 30px 36px;
  width: calc(100% - (36px * 2px));
`;

const Root = styled.div`
  font-size: 12px;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
`;

const TopInfos = styled.div`
  width: 100%;
  background-color: #00a9b5;
  border-right: 1px solid #333333;
  color: #e4e4e4;
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
