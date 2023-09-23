import { ModalComponent } from "../utils/Modal.component";
import { Button } from "antd";
import { S } from './study.modal.style'
import { useGlobalStore } from "../../stores/global.store";

export const ParticipationModalComponent = () => {
    /* Store */
    const { setModal } = useGlobalStore();

    const closeModal = () => {
        setModal(false)
    }
    return(
        <ModalComponent modalTitle={`참가하기`}>
            <S.ModalContainer>
                <span>해당 스터디에 참여하시겠습니까?</span>
                <S.CenterButtonBox>
                <Button>참여</Button>
                <Button onClick={closeModal}>취소</Button>
                </S.CenterButtonBox>
            </S.ModalContainer>
        </ModalComponent>
    )
}