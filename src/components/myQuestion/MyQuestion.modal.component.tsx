import { ModalComponent } from "../utils/Modal.component";
import React from "react";
import { IProp } from "../../interfaces/prop.interface";
import { useGlobalStore } from "../../stores/global.store";
import { S } from './myQuestion.modal.style'

export const MyQuestionModalComponent = ({ questionData }: IProp) => {
  const { userInfo } = useGlobalStore();

  return (
    <ModalComponent
      modalTitle={`${questionData?.topic} / ${questionData?.type}`}
    >
      <S.ModalContainer>
        <S.WriteTime>
          {new Date(questionData?.createdAt!).toLocaleString()}
        </S.WriteTime>
        <S.Bar />
        <S.ChatBody>
          <S.UserName>
            {userInfo?.name}
            <S.SubWriteTime>
              {new Date(questionData?.createdAt!).toLocaleTimeString()}
            </S.SubWriteTime>
          </S.UserName>
          <S.QuestionData>
            {questionData?.query}
          </S.QuestionData>
        </S.ChatBody>
        <S.AnswerData>
          <p>{questionData?.answer}</p>
        </S.AnswerData>
      </S.ModalContainer>
    </ModalComponent>
  );
};
