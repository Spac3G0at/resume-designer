import styled from "styled-components";
import { useCV } from "../../CVContext";
import ConfirmModal from "../ConfirmModal";

const SkillItem = ({ skill, last, groupId }) => {
  const {
    removeFromMainGroup,
    cv: {
      settings: { resume_scale_factor },
    },
    setModal,
    editable,
  } = useCV();

  const handleRemove = () => {
    setModal(
      <ConfirmModal
        text="Remove this item ?"
        confirm={() => removeFromMainGroup(skill.id, groupId)}
      />
    );
  };

  return (
    <Root $last={last}>
      <Title $f={resume_scale_factor}>{skill.label}</Title>
      <p style={{ margin: 0, color: "#444444" }}>{skill.description}</p>

      <Actions $editable={editable}>
        <button onClick={handleRemove}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </Actions>
    </Root>
  );
};

export default SkillItem;

const Actions = styled.div`
  background: white;
  position: absolute;
  top: 10px;
  right: 10px;
  color: black;
  opacity: 0; /* Hidden by default */
  visibility: hidden; /* Prevent interaction when hidden */
  transition: all 0.2s ease;
  display: ${({ $editable }) => ($editable ? "block" : "none")};
  button {
    color: black;
    font-size: 12px;
    background: none;
    border: none;
    i {
      transition: color 0.2s ease;
      pointer-events: none;
    }
    &:hover {
      cursor: pointer;
      i {
        color: #d00000;
      }
    }
  }
`;

const Root = styled.div`
  padding-bottom: ${({ $last }) => ($last ? "0" : "10px")};
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: -5px;
      right: -10px;
    }
  }
`;

const Title = styled.strong`
  font-size: ${({ $f }) => `${14 * $f}px`};
`;
