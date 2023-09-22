import React, { useEffect, useState } from "react";
import { S } from "./community.style";
import { Form, Input, List, message, Select } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { ISearchData } from "../../interfaces/api/requests/searchData.interface";
import { ICommunity } from "../../interfaces/api/results/question.interface";
import { useGlobalStore } from "../../stores/global.store";
import { useQuery } from "@tanstack/react-query";
import { usePostQueries } from "../../queries/post.query";
import { IDocument } from "../../interfaces/api/results/document.interface";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const CommunityComp = () => {
  /* Antd Message */
  const [messageApi, contextHolder] = message.useMessage();

  /* Navigator */
  const navigate = useNavigate();

  /* Form */
  const [form] = Form.useForm<ISearchData>();

  /* State */
  const [isLoading, setIsLoading] = useState(true);

  /* Store */
  const { setHeader } = useGlobalStore();

  /* Query */
  const { getPostsData } = usePostQueries();

  /* Use Effect */
  useEffect(() => {
    setIsLoading(false);
    setHeader(true);
  }, []);

  /* Function */
  const submit = (data: ISearchData) => {
    alert("target");
  };

  const formRules = [
    {
      required: true,
      whitespace: true,
      message: "검색할 내용을 입력해주세요.",
    },
  ];

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
    <>
      <S.Content>
        <S.CommunityContainer>
          <Form form={form} onFinish={submit}>
            <Form.Item name="searchData" required={true} rules={formRules}>
              <S.SearchInput
                size={"large"}
                placeholder={"집단 지성을 이용해보아요!"}
                disabled={isLoading}
                suffix={
                  <AiOutlineSearch
                    cursor="pointer"
                    onClick={() => form.submit()}
                  />
                }
              />
            </Form.Item>
          </Form>
          <S.SelectBox>
                    <S.Language
                        name="topic"
                        required={true}
                        rules={requiredRule.topic}
                    >
                        <Select
                            size="small"
                            options={[{ label: "Java", value: 1 },
                                { label: "JavaScript", value: 2 },
                                { label: "Kotlin", value: 3 },
                                { label: "React", value: 4 },
                                { label: "Next.js", value: 5 },
                                { label: "Node.js", value: 6 },
                                { label: "Nest.js", value: 7 },
                                { label: "Spring", value: 8 }]}
                            placeholder="언어"
                        />
                    </S.Language>

                    <S.QuestionType
                        name="questionType"
                        required={true}
                        rules={requiredRule.questionType}
                    >
                        <Select
                            size="small"
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
                            size="small"
                            placeholder="라이브러리를 입력해주세요."
                        />
                    </S.Library>
                    </S.SelectBox>
          <S.ListContainer>
            <List
              itemLayout="vertical"
              size={"large"}
              loading={isLoading}
              dataSource={getPostsData as IDocument[]}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <S.Title
                    onClick={() => navigate(`/community/documents/${item.id}`)}
                  >
                    {item.title}
                  </S.Title>
                  <S.Contents>
                    {item.content
                      .substring(item.content.indexOf("## 본문"))
                      .replace("## 본문", "")}
                  </S.Contents>
                  <S.Info>
                    <img
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        marginRight: 5,
                      }}
                      src={item.user.profileImgUrl}
                    />
                    {item.user.name} |{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </S.Info>
                </List.Item>
              )}
            />
          </S.ListContainer>
        </S.CommunityContainer>
      </S.Content>
    </>
  );
};
