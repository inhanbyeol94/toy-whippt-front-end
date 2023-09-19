import { Button, Modal } from "antd";
import { IProp } from "../../interfaces/prop.interface";
import { useState } from "react";
import { useGlobalStore } from "../../stores/global.store";
export const ModalComponent = ({ children, footer }: IProp) => {
  const { modal, setModal } = useGlobalStore();
  return (
    <Modal
      title="Modal 1000px width"
      centered
      open={modal}
      onCancel={() => setModal(false)}
      width={1000}
      footer={footer || []}
    >
      {children}
    </Modal>
  );
};
