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
          if (error?.status) return sendMessage("error", error?.message);
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
          if (error?.status) return sendMessage("error", error?.message);
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
          if (error?.status) return sendMessage("error", error?.message);
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
              <S.Title>{getPostData?.title}</S.Title>
              {userInfo.id === getPostData?.user.id ? (
                <S.ButtonBox>
                  <Button
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
                </S.ButtonBox>
              ) : null}
            </div>
            <div>
            <S.WriteTime>
              {getPostData?.user.name} |{" "}
              {new Date(getPostData?.createdAt!).toLocaleString()}
            </S.WriteTime>
          </div>
          <S.ContentsBody>
          <S.MarkdownContainer>
            <MDEditor.Markdown
              source={getPostData?.content}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </S.MarkdownContainer>
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
            <S.CommentList>
              {getCommentsData?.map((info) => (
                <S.CommentContents
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
                        <S.CommentWriteTime>
                          {new Date(info.createdAt).toLocaleString()}
                        </S.CommentWriteTime>
                        {userInfo.id === info.user.id ? (
                          <S.CommentEditAndDeleteButtonBpx>
                            <IoTrashOutline
                              cursor="pointer"
                              onClick={() =>
                                deleteComment(info.id, param.document!)
                              }
                            />
                            <AiOutlineEdit
                              cursor="pointer"
                              onClick={() => {
                                editShowModal({
                                  documentId: param.document!,
                                  commentId: info.id,
                                  comment: info.comment,
                                });
                              }}
                            />
                          </S.CommentEditAndDeleteButtonBpx>
                        ) : null}
                      </div>
                    </div>
                    <S.CommentBody>
                      {info.comment}
                    </S.CommentBody>
                  </div>
                </S.CommentContents>
              ))}
            </S.CommentList>
          </S.CommentContainer>
            </S.ContentsBody>
        </S.DocumentsContainer>
        <CommentEditModalComponent editCommentData={editComment} />
      </S.Content>
    </>
  );
};
