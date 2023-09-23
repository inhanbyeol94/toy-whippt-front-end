import { ModalComponent } from "../utils/Modal.component";
import { S } from './study.modal.style'

export const AddStudyRoomModalComponent = () => {
    return(
        <ModalComponent modalTitle={`스터디 만들기`}>
            <S.ModalContainer>
            <span>스터디 이름</span>
            <S.AddStudyRoomInput type="text"/>
            <span>최대 참여 인원</span>
            <S.MaxParticipantsInput type="number"/>
            <span>스터디 소개</span>
            <S.StudyInfoTextArea />
            <span>태그 입력</span>
            <S.AddStudyRoomInput type="text"/>
                <div>
            <S.ModalInnerButton>만들기</S.ModalInnerButton>
                </div>
            </S.ModalContainer>
        </ModalComponent>
    )
}