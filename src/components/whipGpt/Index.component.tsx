import React, { useEffect, useRef, useState } from "react";
import { Form, Select, Button, FloatButton } from "antd";
import { IoIosCopy, IoIosShareAlt } from "react-icons/io";
import { AiOutlinePlus, AiOutlineSend } from "react-icons/ai";
import { S } from "./whipGpt.style";
import { IWhipGPTData } from "../../interfaces/api/requests/whipGPT.interface";
import { useGlobalStore } from "../../stores/global.store";
import { useQuestionQueries } from "../../queries/question.query";
import { useQuestionsStore } from "../../stores/questions.store";
import { queryClient } from "../../App";
import MDEditor from "@uiw/react-md-editor";
import { GrFormClose } from "react-icons/gr";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  IQuestionDetail,
  IQuestionStoreData,
} from "../../interfaces/api/results/question.interface";
import { useQuestionStore } from "../../stores/question.store";
import { useNavigate } from "react-router-dom";

export const IndexComponent = () => {
  /* Navigator */
  const navigate = useNavigate();

  /* Ref */
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Form */
  const [form] = Form.useForm<IWhipGPTData>();

  /* Store */
  const { setHeader, setSpin, userInfo, sendMessage } = useGlobalStore();
  const { isForm, questionId, setQuestionId, setIsForm } = useQuestionsStore();
  const { setQuestion } = useQuestionStore();

  /* Query */
  const {
    createQuestionRoomMutation,
    findRecentQuestionListQuery,
    findOneQuestionQuery,
    continueQuestionMutation,
    deleteQuestionMutation,
    isSuccess,
  } = useQuestionQueries(questionId);

  /* Effect */
  useEffect(() => {
    setHeader(true);
    setSpin(false);
    setIsForm(true);
    scrollToBottom();
  }, []);

  useEffect(() => {
    form.setFieldValue("type", findOneQuestionQuery?.type);
    form.setFieldValue("topic", findOneQuestionQuery?.topic);
    form.setFieldValue("library", findOneQuestionQuery?.library);
  }, [findOneQuestionQuery]);

  useEffect(() => {
    if (isSuccess) return scrollToBottom();
  }, [isSuccess]);

  useEffect(() => {
    queryClient.invalidateQueries(["questionData", questionId]);
  }, [questionId]);

  useEffect(() => {
    if (findRecentQuestionListQuery?.length === 0) {
      createQuestionRoomMutation.mutate();
    }
  }, [findRecentQuestionListQuery]);

  useEffect(() => {
    if (continueQuestionMutation.isLoading) {
      setIsForm(true);
      setSpin(true);
    } else {
      setIsForm(false);
      setSpin(false);
      scrollToBottom();
    }
  }, [continueQuestionMutation.isLoading]);

  /* Function */

  const goToWrite = (data: IQuestionStoreData) => {
    setQuestion(data);
    navigate("/write");
  };
  const submit = (data: IWhipGPTData) => {
    continueQuestionMutation.mutate(
      { ...data, questionId },
      {
        onSuccess: () => {
          form.setFieldValue("query", "");
          scrollToBottom();
        },
      },
    );
  };

  const addRoom = () => {
    createQuestionRoomMutation.mutate(undefined, {
      onSuccess: () => {
        setQuestionId("");
        sendMessage("success", "질문이 정상 생성되었습니다.");
      },
      onError: (error) => {
        if (error?.status) return sendMessage("error", error.message);
        console.error(error);
        sendMessage("error", "오류가 발생하였습니다.");
      },
    });
  };

  const deleteRoom = () => {
    deleteQuestionMutation.mutate(undefined, {
      onSuccess: () => {
        setQuestionId("");
        sendMessage("success", "질문이 정상 삭제되었습니다.");
      },
      onError: (error) => {
        if (error?.status) return sendMessage("error", error.message);
        console.error(error);
        sendMessage("error", "오류가 발생하였습니다.");
      },
    });
  };

  /* Handle Function */
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  const promptHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.submit();
    }
  };

  const requiredRule = {
    topic: [
      {
        required: true,
        message: "언어를 선택해주세요.",
      },
    ],
    questionType: [
      {
        required: true,
        message: "질문 유형을 선택해주세요.",
      },
    ],
    title: [
      {
        required: true,
        whitespace: true,
        message: "질문을 입력해주세요.",
      },
    ],
  };

  return (
    <S.Content>
      <S.Container>
        <S.ChatContainer ref={scrollRef}>
          {findOneQuestionQuery?.questionDetails.map((info) => (
            <S.ChatBox key={info.id}>
              <S.WriteContent>
                <p>
                  {userInfo.name}{" "}
                  <S.CreationTime>
                    {new Date(info.createdAt).toLocaleTimeString()}
                  </S.CreationTime>
                </p>
                <S.CreatedContent>{info.query}</S.CreatedContent>
              </S.WriteContent>

              <S.AnswerContent data-color-mode="light">
                <MDEditor.Markdown
                  source={info.answer}
                  style={{ whiteSpace: "pre-wrap", fontSize: 14 }}
                />
                <S.ButtonBox>
                  <Button
                    icon={<IoIosShareAlt />}
                    onClick={() => goToWrite(info)}
                  >
                    커뮤니티 공유
                  </Button>
                  <CopyToClipboard
                    text={`[질문] ${info.topic} / ${info.type} ${
                      info.library ? ` / ${info.library}` : ""
                    } \n${info.query}\n\n[답변]\n${info.answer}`}
                    onCopy={() => {
                      sendMessage("success", "클립보드에 복사되었습니다.");
                    }}
                  >
                    <Button icon={<IoIosCopy />}>복사</Button>
                  </CopyToClipboard>
                </S.ButtonBox>
              </S.AnswerContent>
            </S.ChatBox>
          ))}
        </S.ChatContainer>
        <S.Bar />
        <Form form={form} onFinish={submit} disabled={isForm}>
          <S.FormBox>
            <S.Language name="topic" required={true} rules={requiredRule.topic}>
              <Select
                size="middle"
                options={[
                  { label: "Java", value: "JAVA" },
                  { label: "JavaScript", value: "JAVASCRIPT" },
                  { label: "Kotlin", value: "KOTLIN" },
                  { label: "React", value: "REACT" },
                  { label: "Next.js", value: "NEXTJS" },
                  { label: "Node.js", value: "NODEJS" },
                  { label: "Nest.js", value: "NESTJS" },
                  { label: "Spring", value: "SPRING" },
                  { label: "CS", value: "COMPUTER SCIENCE" },
                ]}
                placeholder="언어"
              />
            </S.Language>

            <S.QuestionType
              name="type"
              required={true}
              rules={requiredRule.questionType}
            >
              <Select
                size="middle"
                options={[
                  { label: "웹 개발", value: "웹 개발" },
                  { label: "모바일 앱 개발", value: "모바일 앱 개발" },
                  { label: "데이터베이스와 데이터 관리", value: "데이터 관리" },
                  { label: "보안", value: "보안" },
                  { label: "개발 언어", value: "프로그래밍 언어" },
                  { label: "개발 프로세스와 도구", value: "개발 툴" },
                  { label: "채용과 경력", value: "개발자 채용" },
                  { label: "컴퓨터 과학", value: "컴퓨터 과학" },
                ]}
                placeholder="질문 유형"
              />
            </S.QuestionType>
            <S.Library name="library" required={true}>
              <S.LibraryInput
                size="middle"
                placeholder="라이브러리를 입력해주세요."
              />
            </S.Library>
          </S.FormBox>
          <S.TextAreaBox>
            <S.FormTitle
              name="query"
              required={true}
              rules={requiredRule.title}
            >
              <S.TextArea
                onKeyPress={promptHandler}
                placeholder={"여기에 질문을 입력해주세요."}
                autoSize={{ minRows: 2, maxRows: 2 }}
                size="middle"
              />
            </S.FormTitle>

            <Form.Item>
              <S.SendButton icon={<AiOutlineSend />} htmlType="submit" />
            </Form.Item>
          </S.TextAreaBox>
        </Form>
        <FloatButton
          shape="circle"
          type="default"
          style={{ boxShadow: "0 0 10px gray" }}
          icon={<BsFillTrash3Fill />}
          tooltip="이 질문을 삭제할 수 있어요."
          onClick={deleteRoom}
        />
        <FloatButton
          shape="circle"
          type="primary"
          style={{ boxShadow: "0 0 10px gray", right: 84 }}
          icon={<AiOutlinePlus />}
          tooltip="새로운 질문을 추가해보세요!"
          onClick={addRoom}
        />
      </S.Container>
    </S.Content>
  );
};
