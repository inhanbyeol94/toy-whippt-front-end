import { Modal } from "antd";
import { IProp } from "../../interfaces/prop.interface";
import { useGlobalStore } from "../../stores/global.store";

export const ModalComponent = ({ children, footer, modalTitle }: IProp) => {
  const { modal, setModal } = useGlobalStore();
  return (
    <Modal
      title={modalTitle}
      centered
      open={modal}
      onCancel={() => setModal(false)}
      width={700}
      footer={footer || []}
    >
      {children}
    </Modal>
  );
};
