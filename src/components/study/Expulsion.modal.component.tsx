import { ModalComponent } from "../utils/Modal.component";
import { Button } from "antd";
import { S } from './study.modal.style'
import { useGlobalStore } from "../../stores/global.store";

export const ExpulsionModalComponent = () => {
    /* Store */
    const { setModal } = useGlobalStore();

    const closeModal = () => {
        setModal(false)
    }
    return(
        <ModalComponent modalTitle={`내보내기`}>
            <S.ModalContainer>
                <span>'인한별'님을 정말 내보내시겠습니까?</span>
                <S.CenterButtonBox>
                    <Button>내보내기</Button>
                    <Button onClick={closeModal}>취소</Button>
                </S.CenterButtonBox>
            </S.ModalContainer>
        </ModalComponent>
    )
}