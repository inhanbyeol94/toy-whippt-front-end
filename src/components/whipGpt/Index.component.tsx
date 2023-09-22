import React, { useEffect, useState } from "react";
import { Form, Select, Button } from "antd";
import { IoIosCopy, IoIosShareAlt } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { S } from "./whipGpt.style";
import { IWhipGPTData } from "../../interfaces/api/requests/whipGPT.interface";
import { useGlobalStore } from "../../stores/global.store";

export const IndexComponent = () => {
  /* Form */
  const [form] = Form.useForm<IWhipGPTData>();

  /* Store */
  const { setHeader, setSpin } = useGlobalStore();

  useEffect(() => {
    setHeader(true);
    setSpin(false);
  }, []);

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const submit = (data: IWhipGPTData) => {
    console.log(data);
  };

  /* Handle Function */
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
    library: [
      {
        required: true,
        whitespace: true,
        message: "라이브러리를 입력해주세요.",
      },
    ],
  };

  return (
    <S.Content>
      <S.Container>
        <S.ChatContainer>
          <S.ChatBox>
            <S.WriteContent>
              <p>
                인한별 <S.CreationTime>18:49</S.CreationTime>
              </p>
              <S.CreatedContent>
                Javascript에서 Express를 사용하려고하는데, app.post() 메소드
                전에 미들웨어를 구축하고 싶어 어떻게 해야해?
              </S.CreatedContent>
            </S.WriteContent>

            <S.AnswerContent>
              <p>
                에휴 그건 저도모르죠.. Express 공식사이트에 널려있는게 정보인데
                그걸 왜 저한테 물어보세요?
                <br />
                정말 한심하지만, 공식사이트 링크정도는 공유드리죠.
                <br />
                <br />
                https://expressjs.com/ko/
              </p>
              <S.ButtonBox>
                <Button icon={<IoIosShareAlt />}>커뮤니티 공유</Button>
                <Button icon={<IoIosCopy />}>복사</Button>
              </S.ButtonBox>
            </S.AnswerContent>
          </S.ChatBox>
          <S.ChatBox>
            <S.WriteContent>
              <p>
                인한별 <S.CreationTime>18:49</S.CreationTime>
              </p>
              <S.CreatedContent>
                어머! 어쩜그리 친절한거니? 혹시 정신병자 사이코패스야?
              </S.CreatedContent>
            </S.WriteContent>

            <S.AnswerContent>
              <p>
                그건 알려드릴 수 없습니다, 저의 구뇌구조는 국가 기밀 사항이에요.
              </p>
              <S.ButtonBox>
                <Button icon={<IoIosShareAlt />}>커뮤니티 공유</Button>
                <Button icon={<IoIosCopy />}>복사</Button>
              </S.ButtonBox>
            </S.AnswerContent>
          </S.ChatBox>
          <S.ChatBox>
            <S.WriteContent>
              <p>
                인한별 <S.CreationTime>18:49</S.CreationTime>
              </p>
              <S.CreatedContent>난 정식으로 너를 고소할거야.</S.CreatedContent>
            </S.WriteContent>
            <S.AnswerContent>
              <p>좋은 정보를 제공해주셔서 감사합니다.</p>
              <S.ButtonBox>
                <Button icon={<IoIosShareAlt />}>커뮤니티 공유</Button>
                <Button icon={<IoIosCopy />}>복사</Button>
              </S.ButtonBox>
            </S.AnswerContent>
          </S.ChatBox>
        </S.ChatContainer>
        <S.Bar />
        <Form form={form} onFinish={submit}>
          <S.FormBox>
            <S.Language name="topic" required={true} rules={requiredRule.topic}>
              <Select
                size="middle"
                options={[{ label: "Java", value: 1 },
                  { label: "JavaScript", value: 2 },
                  { label: "Kotlin", value: 3 },
                  { label: "React", value: 4 },
                  { label: "Next.js", value: 5 },
                  { label: "Node.js", value: 6 },
                  { label: "Nest.js", value: 7 },
                  { label: "Spring", value: 8 }
                ]}
                placeholder="언어"
              />
            </S.Language>

            <S.QuestionType
              name="questionType"
              required={true}
              rules={requiredRule.questionType}
            >
              <Select
                size="middle"
                options={[{ label: "웹 개발", value: "WEB" },
                  { label: "모바일 앱 개발", value: "APP" },
                  { label: "데이터베이스와 데이터 관리", value: "DATA" },
                  { label: "보안", value: "SECURITY" },
                  { label: "개발 프로세스와 도구", value: "TOOL" },
                  { label: "채용과 경력", value: "CAREER" },
                  { label: "기타", value: "ETC" }]}
                placeholder="질문 유형"
              />
            </S.QuestionType>
            <S.Library
              name="library"
              required={true}
              rules={requiredRule.library}
            >
              <S.LibraryInput
                size="middle"
                placeholder="라이브러리를 입력해주세요."
              />
            </S.Library>
          </S.FormBox>
          <S.TextAreaBox>
            <S.FormTitle
              name="title"
              required={true}
              rules={requiredRule.title}
            >
              <S.TextArea
                onKeyDown={promptHandler}
                placeholder={"여기에 프롬프트를 입력해주세요."}
                autoSize={{ minRows: 2, maxRows: 2 }}
                size="middle"
              />
            </S.FormTitle>

            <Form.Item>
              <S.SendButton
                icon={<AiOutlineSend />}
                htmlType="submit"
                disabled={isSubmit}
              />
            </Form.Item>
          </S.TextAreaBox>
        </Form>
      </S.Container>
    </S.Content>
  );
};
