import React, { useEffect, useState } from "react";
import { S } from "./study.style";
import { Avatar, FloatButton, Form, List, Tag, Tooltip } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { ISearchData } from "../../interfaces/api/requests/searchData.interface";
import { useGlobalStore } from "../../stores/global.store";
import { usePostQueries } from "../../queries/post.query";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../../App";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { HiOutlinePlus } from "react-icons/hi";
import { useStudyQueries } from "../../queries/study.query";

export const IndexComponent = () => {
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
    getStudiesQuery,
    getStudiesHasNextPage,
    getStudiesFetchNextPage,
    getStudiesIsSuccess,
    getStudiesRefetch,
  } = useStudyQueries(keywordData);

  /* Effect */
  useEffect(() => {
    console.log(getStudiesHasNextPage);
    if (inView && getStudiesHasNextPage) {
      getStudiesFetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return setIsLoading(false);
  }, [getStudiesIsSuccess]);

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
              dataSource={getStudiesQuery?.pages}
              renderItem={(data, index) => (
                <React.Fragment key={index}>
                  {data[0].map((item) => (
                    <List.Item key={item.id}>
                      <S.Title
                        onClick={() => navigate(`/study/room/${item.id}`)}
                      >
                        {item.title}
                        {item.studyUsers?.length == 2 ? (
                          <Avatar.Group
                            maxCount={5}
                            size="small"
                            maxStyle={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                              textAlign: "right",
                            }}
                          >
                            {item.studyUsers?.map((studyUser) => (
                              <Avatar src={studyUser.user?.profileImgUrl} />
                            ))}
                          </Avatar.Group>
                        ) : null}
                      </S.Title>
                      <div style={{ marginTop: 5 }}>
                        <Tag color="#87d068">{item.topic}</Tag>
                        <Tag color="#108ee9">
                          최대인원 {item.maxCount}명 중 {item.joinCount}명이
                          참여 중
                        </Tag>
                      </div>
                      <S.Contents>{item.content}</S.Contents>
                      {item.studyUsers
                        ?.filter((info) => info.isHost)
                        .map((info) => (
                          <S.Info>
                            <img
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                marginRight: 5,
                              }}
                              src={info.user?.profileImgUrl}
                            />
                            {info.user?.name} |{" "}
                            {new Date(item?.createdAt!).toLocaleString()}
                          </S.Info>
                        ))}
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
      <FloatButton
        type="primary"
        onClick={() => navigate("/study/manage")}
        tooltip="스터디를 생성해보세요!"
        icon={<HiOutlinePlus />}
        style={{ right: 50, boxShadow: "0 0 10px gray" }}
      />
    </>
  );
};
