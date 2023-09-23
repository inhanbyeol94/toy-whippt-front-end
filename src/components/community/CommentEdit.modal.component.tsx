import { ModalComponent } from "../utils/Modal.component";
import React, { useEffect, useState } from "react";
import { IProp } from "../../interfaces/prop.interface";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { useGlobalStore } from "../../stores/global.store";
import { usePostQueries } from "../../queries/post.query";
import styled from "styled-components";

export const CommentEditModalComponent = ({ editCommentData }: IProp) => {
  /* Query */
  const { editCommentMutation } = usePostQueries();

  /* Store */
  const { sendMessage, setModal } = useGlobalStore();

  /* State */
  const [editComment, setEditComment] = useState<string | undefined>();

  /* useEffect */
  useEffect(() => {
    setEditComment(editCommentData?.comment);
  }, [editCommentData]);

  /* Function */
  const editCommentHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  };

  const reqeustEditComment = () => {
    if (!editComment)
      return sendMessage("error", "수정할 댓글을 입력해주세요.");
    if (editComment!.length >= 255)
      return sendMessage(
        "error",
        "수정할 댓글은 최대 255자 이내 입력해주세요.",
      );

    editCommentMutation.mutate(
      {
        commentId: editCommentData?.commentId!,
        documentId: editCommentData?.documentId!,
        comment: editComment,
      },
      {
        onSuccess: () => {
          sendMessage("success", "댓글이 정상 수정되었습니다.");
          setModal(false);
        },
        onError: (error) => {
          if (error?.status) return sendMessage("error", error?.message);
          console.error(error);
          sendMessage("error", "오류가 발생했습니다.");
        },
      },
    );
  };
  return (
    <ModalComponent modalTitle={`댓글 수정`}>
      <S.TextArea
        value={editComment}
        onChange={editCommentHandle}
        maxLength={254}
      />
        <S.EditButton onClick={reqeustEditComment}>
          수정
        </S.EditButton>
    </ModalComponent>
  );
};

  const S = {
    TextArea: styled(TextArea)`
      margin: 10px 0 35px 0;
    `,
    EditButton: styled(Button)`
      bottom: 0;
      right: 8px;
      margin: 15px;
      position: absolute;
    `,
  }
