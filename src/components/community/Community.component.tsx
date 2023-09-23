import React, { useEffect, useState } from "react";
import { S } from "./community.style";
import { Form, List } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { ISearchData } from "../../interfaces/api/requests/searchData.interface";
import { useGlobalStore } from "../../stores/global.store";
import { usePostQueries } from "../../queries/post.query";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../../App";

export const CommunityComp = () => {
  /* InView */
  const [ref, inView] = useInView();

  /* Navigator */
  const navigate = useNavigate();

  /* Form */
  const [form] = Form.useForm<ISearchData>();

  /* State */
  const [isLoading, setIsLoading] = useState(true);
  const [keywordData, setKeywordData] = useState<string | undefined>();

  /* Store */
  const { setHeader } = useGlobalStore();

  /* Query */
  const {
    getPostsData,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    refetch,
    resetGetPostsMutation,
  } = usePostQueries(undefined, keywordData);

  /* Use Effect */
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return setIsLoading(false);
  }, [isSuccess]);

  useEffect(() => {
    setHeader(true);
  }, []);

  /* Function */
  const submit = (data: ISearchData) => {
    setKeywordData(data.searchData);
    queryClient.invalidateQueries(["getPosts", keywordData]);
  };

  return (
    <>
      <S.Content>
        <S.CommunityContainer>
          <Form form={form} onFinish={submit}>
            <Form.Item name="searchData">
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
                        <S.Img
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
            <S.Ref ref={ref}>
              .
            </S.Ref>
          </S.ListContainer>
        </S.CommunityContainer>
      </S.Content>
    </>
  );
};
