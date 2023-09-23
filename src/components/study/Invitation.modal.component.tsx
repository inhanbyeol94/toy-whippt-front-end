import { ModalComponent } from "../utils/Modal.component";
import { S } from "./study.modal.style";

export const InvitationModalComponent = () => {
    return(
        <ModalComponent modalTitle={`유저 초대하기`}>
            <S.ModalContainer>
                <span>이메일</span>
                <S.EmailInput type="email" />
                <div>
                    <S.ModalInnerButton>보내기</S.ModalInnerButton>
                </div>
            </S.ModalContainer>
        </ModalComponent>
    )
}