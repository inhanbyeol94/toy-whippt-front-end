import TextArea from "antd/es/input/TextArea";
import { Button, Input } from "antd";
import styled from "styled-components";
export const S  = {
    ModalContainer: styled.div`
      gap: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
    AddStudyRoomInput: styled(Input)`
      /* 넓이 조정 필요 */
    `,
    MaxParticipantsInput: styled(Input)`
      /* 넓이 조정 필요 */
    `,
    StudyInfoTextArea: styled(TextArea)`
      /* 넓이 조정 필요 */
    `,
    ModalInnerButton: styled(Button)`
      width: 10%;
      right: 20px;
      font-weight: bold;
      position: absolute;
    `,
    CenterButtonBox: styled.div`
      gap: 20px;
      display: flex;
      justify-content: center;
    `,
    MessageTextArea: styled(TextArea)`
      /* 최소 길이값 넣어주기 */
    `,
    EmailInput: styled(Input)``,
}