import ModalPortal from "./ModalPortal";
import { useCV } from "../CVContext";

const Modal = () => {
  const { modal, setModal } = useCV();
  return (
    <ModalPortal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
      {modal}
    </ModalPortal>
  );
};

export default Modal;
