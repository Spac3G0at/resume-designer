import styled from "styled-components";
import { useCV } from "../../CVContext";
import ConfirmModal from "../ConfirmModal";
import ExperienceModal from "./ExperienceModal";

const ExperienceItem = ({ data, groupId, last }) => {
  const {
    removeFromMainGroup,
    editFromMainGroup,
    cv: {
      settings: { timeline, resume_scale_factor },
    },
    setModal,
    closeModal,
    editable,
  } = useCV();

  const handleRemove = () => {
    setModal(
      <ConfirmModal
        text="Remove this item ?"
        confirm={() => removeFromMainGroup(data.id, groupId)}
      />
    );
  };

  const edit = (item) => {
    editFromMainGroup({ ...item, id: data.id }, groupId);
    closeModal();
  };

  const handleEdit = () => {
    setModal(
      <ExperienceModal
        onAdd={edit}
        experience={data}
        groupId={groupId}
        cancel={closeModal}
      />
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      // month: "short",
      year: "numeric",
    });
  };

  const from = formatDate(data.from);
  const to = formatDate(data.to);

  const dateString =
    from === to ? from : `${from}${data.to ? ` - ${to}` : " - Present"}`;

  return (
    <Root>
      {timeline && (
        <Line>
          <div />
        </Line>
      )}
      <Content $last={last}>
        <Title $f={resume_scale_factor}>{data.title}</Title>

        <p>
          <Infos>{dateString}</Infos>{" "}
          <span className="company-label">{data.company}</span>{" "}
          <Infos>{data.location}</Infos>
        </p>

        <Description dangerouslySetInnerHTML={{ __html: data.description }} />
      </Content>
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

export default ExperienceItem;

const Title = styled.strong`
  font-size: ${({ $f }) => `${14 * $f}px`};
`;

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
  display: flex;
  position: relative;
  p {
    margin: 0;
  }
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: -5px;
      right: -10px;
    }
  }
`;

const Line = styled.div`
  border-left: 1px solid black;
  margin-right: 15px;
  & > div {
    width: 9px;
    height: 9px;
    background: black;
    border-radius: 50%;
    margin-left: -5px;
    margin-top: 8px;
  }
`;

const Infos = styled.span`
  color: #777777;
  &:last-of-type {
    color: #444444;
  }
`;

const Content = styled.div`
  padding-bottom: ${({ $last }) => ($last ? "5px" : "10px")};
`;

const Description = styled.p`
  font-size: calc(1 * 0.75rem);
  color: #444444;
`;
