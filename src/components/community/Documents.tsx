import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { S } from "./documents.style";
import { PiPencilLineFill } from "react-icons/pi";
import { useGlobalStore } from "../../stores/global.store";
import { usePostQueries } from "../../queries/post.query";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { CommentEditModalComponent } from "./CommentEdit.modal.component";
import { IEditComment } from "../../interfaces/api/requests/editComment.interface";
import { FiTrash2 } from "react-icons/fi";
import { useEditPostStore } from "../../stores/editPost.store";
import { IEditPost } from "../../interfaces/api/requests/editPost.interface";

export const Documents = () => {
  /* State */
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState<string | undefined>();
  const [editComment, setEditComment] = useState<IEditComment>();

  /* Params */
  const param = useParams();

  /* Store */
  const { setHeader, userInfo, sendMessage, setModal } = useGlobalStore();
  const { setPostData } = useEditPostStore();

  /* Navigator */
  const navigate = useNavigate();

  /* Query */
  const {
    getPostData,
    newComment,
    getCommentsData,
    deleteCommentMutation,
    delPostMutation,
  } = usePostQueries(param.document);

  /* Use Effect */
  useEffect(() => {
    setHeader(true);
  }, []);

  /* Function */
  const commentHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const goToEditPost = (data: IEditPost) => {
    setPostData(data);
    navigate("/write");
  };

  const deleteComment = (commentId: string, documentId: string) => {
    deleteCommentMutation.mutate(
      { commentId, documentId },
      {
        onSuccess: () => {
          sendMessage("success", "정상 삭제되었습니다.");
        },
        onError: (error) => {
          if (error.response?.status)
            return sendMessage("error", error.response.data.message);
          console.error(error);
          sendMessage("error", "오류가 발생했습니다.");
        },
      },
    );
  };

  const deletePost = () => {
    delPostMutation.mutate(
      { postId: param.document! },
      {
        onSuccess: () => {
          sendMessage("success", "게시글이 정상 삭제되었습니다.");
          navigate("/community");
        },
        onError: (error) => {
          if (error.response?.status)
            return sendMessage("error", error.response.data.message);
          console.error(error);
          sendMessage("error", "오류가 발생했습니다.");
        },
      },
    );
  };

  const editShowModal = (data: IEditComment) => {
    setEditComment(data);
    setModal(true);
  };

  const submitComment = () => {
    if (!comment?.trim()) return sendMessage("error", "댓글을 입력해주세요.");
    if (comment?.length >= 255)
      return sendMessage("error", "댓글은 최대 255자 이내 입력이 가능합니다.");
    setIsLoading(true);

    newComment.mutate(
      { document: param.document, comment },
      {
        onSuccess: () => {
          sendMessage("success", "댓글이 정상 등록되었습니다.");
          setIsLoading(false);
          setComment("");
        },
        onError: (error) => {
          if (error.response?.status)
            return sendMessage("error", error.response.data.message);
          console.error(error);
          sendMessage("error", "오류가 발생했습니다.");
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <>
      <S.Content>
        <S.DocumentsContainer data-color-mode="light">
          <div>
            <div>
              <S.Title>{getPostData?.title}</S.Title>
              {userInfo.id === getPostData?.user.id ? (
                <div style={{ float: "right" }}>
                  <Button
                    style={{ marginRight: 10 }}
                    icon={<AiOutlineEdit />}
                    onClick={() =>
                      goToEditPost({
                        title: getPostData?.title,
                        content: getPostData?.content,
                        postId: param.document!,
                      })
                    }
                  >
                    게시글 수정
                  </Button>
                  <Button icon={<FiTrash2 />} onClick={deletePost}>
                    게시글 삭제
                  </Button>
                </div>
              ) : null}
            </div>
            <p style={{ marginTop: 10, color: "gray" }}>
              {getPostData?.user.name} |{" "}
              {new Date(getPostData?.createdAt!).toLocaleString()}
            </p>
          </div>

          <div style={{ marginTop: 40, marginBottom: 80 }}>
            <MDEditor.Markdown
              source={getPostData?.content}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
          <S.CommentContainer>
            <S.CommentTop>
              <S.Comment>댓글</S.Comment>
              <Button loading={isLoading} onClick={submitComment}>
                댓글 작성하기 <PiPencilLineFill />
              </Button>
            </S.CommentTop>
            <S.CommentBox>
              <S.UserBox>
                <S.ImageBox>
                  <S.Img src={userInfo.profileImgUrl} />
                </S.ImageBox>
                <span>{userInfo.name}</span>
              </S.UserBox>
              <S.TextArea
                onChange={commentHandle}
                value={comment}
                maxLength={254}
              ></S.TextArea>
            </S.CommentBox>
            <div style={{ marginTop: 30, width: "100%" }}>
              {getCommentsData?.map((info) => (
                <div
                  style={{ display: "flex", marginBottom: 50 }}
                  key={info.id}
                >
                  <S.UserBox>
                    <S.ImageBox>
                      <S.Img src={info.user.profileImgUrl} />
                    </S.ImageBox>
                  </S.UserBox>
                  <div style={{ marginLeft: 15 }}>
                    <div style={{ marginBottom: 10 }}>
                      <div>
                        {info.user.name}
                        <span
                          style={{ color: "gray", fontSize: 13, marginLeft: 5 }}
                        >
                          {new Date(info.createdAt).toLocaleString()}
                        </span>
                        {userInfo.id === info.user.id ? (
                          <div style={{ float: "right" }}>
                            <IoTrashOutline
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() =>
                                deleteComment(info.id, param.document!)
                              }
                            />
                            <AiOutlineEdit
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editShowModal({
                                  documentId: param.document!,
                                  commentId: info.id,
                                  comment: info.comment,
                                });
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div
                      style={{
                        maxWidth: 830,
                        width: 830,
                        wordBreak: "break-all",
                      }}
                    >
                      {info.comment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </S.CommentContainer>
        </S.DocumentsContainer>
        <CommentEditModalComponent editCommentData={editComment} />
      </S.Content>
    </>
  );
};
