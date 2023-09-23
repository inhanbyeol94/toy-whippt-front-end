import { ModalComponent } from "../utils/Modal.component";
import { S } from './study.modal.style'
export const SendMessageModalComponent = () => {
    return(
        <ModalComponent modalTitle={`쪽지보내기`}>
            <S.ModalContainer>
                <span>대상 : </span>
                <S.MessageTextArea />
                <div>
                    <S.ModalInnerButton>보내기</S.ModalInnerButton>
                </div>
            </S.ModalContainer>
        </ModalComponent>
    )
}