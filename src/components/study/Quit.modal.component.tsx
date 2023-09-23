import { useGlobalStore } from "../../stores/global.store";
import { ModalComponent } from "../utils/Modal.component";
import { S } from "./study.modal.style";
import { Button } from "antd";

export const QuitModalComponent = () => {
    /* Store */
    const { setModal } = useGlobalStore();

    const closeModal = () => {
        setModal(false)
    }
    return(
        <ModalComponent modalTitle={`탈퇴하기`}>
            <S.ModalContainer>
                <span>해당 스터디에서 정말 탈퇴하시겠습니까?</span>
                <S.CenterButtonBox>
                    <Button>탈퇴</Button>
                    <Button onClick={closeModal}>취소</Button>
                </S.CenterButtonBox>
            </S.ModalContainer>
        </ModalComponent>
    )
}