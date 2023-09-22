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
import { useInView } from "react-intersection-observer";

const { Search } = Input;

export const CommunityComp = () => {
  /* InView */
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  /* Navigator */
  const navigate = useNavigate();

  /* Form */
  const [form] = Form.useForm<ISearchData>();

  /* State */
  const [isLoading, setIsLoading] = useState(false);
  const [keywordData, setKeywordData] = useState<string | undefined>();

  /* Store */
  const { setHeader } = useGlobalStore();

  /* Query */
  const { getPostsData, hasNextPage, fetchNextPage, postsIsLoading } =
    usePostQueries(undefined, keywordData);

  /* Use Effect */
  useEffect(() => {
    if (inView && hasNextPage) {
      console.log(inView);
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!postsIsLoading) {
      setIsLoading(false);
    }
  }, [postsIsLoading]);

  useEffect(() => {
    setIsLoading(false);
    setHeader(true);
  }, []);

  /* Function */
  const submit = (data: ISearchData) => {
    setKeywordData(data.searchData);
  };

  const formRules = [
    {
      required: true,
      whitespace: true,
      message: "검색할 내용을 입력해주세요.",
    },
  ];

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

          <S.ListContainer>
            <List
              itemLayout="vertical"
              size={"large"}
              loading={isLoading}
              dataSource={getPostsData?.pages}
              renderItem={(data, index) => (
                <React.Fragment key={index}>
                  {data[0].map((item) => (
                    <List.Item key={item.id}>
                      <S.Title
                        onClick={() =>
                          navigate(`/community/documents/${item.id}`)
                        }
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
                  ))}
                </React.Fragment>
              )}
            />
            <div ref={ref} style={{ color: "white" }}>
              .
            </div>
          </S.ListContainer>
        </S.CommunityContainer>
      </S.Content>
    </>
  );
};
