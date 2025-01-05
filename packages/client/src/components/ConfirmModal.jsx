import styled from "styled-components";
import { useCV } from "../CVContext";

const ConfirmModal = ({ confirm, text }) => {
  const { setModal } = useCV();

  const close = () => {
    setModal(null);
  };

  const handleConfirm = () => {
    confirm();
    close();
  };

  return (
    <div>
      <Text>{text}</Text>
      <BtnContainer>
        <ButtonGroup>
          <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
          <CancelButton type="button" onClick={close}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </BtnContainer>
    </div>
  );
};

export default ConfirmModal;

const Text = styled.h3`
  text-align: center;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 300px;
`;

const ConfirmButton = styled.button`
  background-color: #ed2553;
  color: white;
  border: 1px solid #ed2553;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #ed2553;
  border: 1px solid #ed2553;
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
  width: 100px;
`;
