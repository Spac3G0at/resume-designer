import styled from "styled-components";
import { useCV } from "../../CVContext";
import ConfirmModal from "../ConfirmModal";
import SkillModal from "./SkillModal";

const SkillItem = ({ skill, last, groupId }) => {
  const {
    removeFromMainGroup,
    editFromMainGroup,
    cv: {
      settings: { resume_scale_factor },
    },
    setModal,
    closeModal,
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

  const edit = (item) => {
    editFromMainGroup({ ...item, id: skill.id }, groupId);
    closeModal();
  };

  const handleEdit = () => {
    console.log("Edit skill");
    setModal(<SkillModal skill={skill} cancel={closeModal} onAdd={edit} />);
  };

  return (
    <Root $last={last}>
      <Title $f={resume_scale_factor}>{skill.label}</Title>
      <p style={{ margin: 0, color: "#444444" }}>{skill.description}</p>

      <Actions $editable={editable}>
        <button onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={handleRemove}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </Actions>
    </Root>
  );
};

export default SkillItem;

const Actions = styled.div`
  background: #1a1a1a;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  color: white;
  opacity: 0; /* Hidden by default */
  visibility: hidden; /* Prevent interaction when hidden */
  transition: all 0.2s ease;
  align-items: center;
  display: ${({ $editable }) => ($editable ? "flex" : "none")};
  button {
    color: var(--color);
    font-size: 12px;
    background: none;
    padding: 2px 5px;
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
