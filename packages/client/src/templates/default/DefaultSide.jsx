import styled from "styled-components";
import Icon from "../../components/Icon";
import { useCV } from "../../CVContext";

const DefaultSide = () => {
  const { cv } = useCV();

  return (
    <SideBar>
      <SideContainer>
        <Item>
          <Icon icon={"\uf0e0"} />
          <p>{cv.email}</p>
        </Item>
        <Item>
          <Icon icon={"\uf095"} />
          <p>{cv.phone}</p>
        </Item>
        <Item>
          <Icon icon={"\uf073"} />
          <p>{cv.age}</p>
        </Item>
        <Item>
          <Icon icon={"\uf015"} />
          <p>{cv.address}</p>
        </Item>

        {cv.languages && (
          <Languages>
            <h5>Languages</h5>
            {cv.languages.map((language, index) => (
              <LanguageItem key={index}>
                <p className="language-name">{language.name}</p>
                <p>{language.level}</p>
              </LanguageItem>
            ))}
          </Languages>
        )}
      </SideContainer>
    </SideBar>
  );
};

export default DefaultSide;

const SideBar = styled.div`
  width: 218px;
  background-color: #333333;
  border-right: 1px solid #333333;
  color: #f0f0f0;
  max-width: 300px;
  min-width: 218px;
`;

const SideContainer = styled.div`
  padding: 38px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  p {
    margin: 0;
    word-break: break-word;
    display: flex;
    align-items: center;
  }
`;

const LanguageItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  p {
    &.language-name {
      font-weight: bold;
    }
    margin: 0;
    word-break: break-word;
    display: flex;
    align-items: center;
  }
`;

const Languages = styled.section`
  h5 {
    margin-bottom: 0.6rem;
    font-weight: bold;
  }
`;
