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
                        저희와 함께 취업을 준비하실 분 모집합니다.
                        <Avatar.Group
                          maxCount={2}
                          size="small"
                          maxStyle={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            textAlign: "right",
                          }}
                        >
                          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                          <Avatar style={{ backgroundColor: "#f56a00" }}>
                            K
                          </Avatar>
                          <Avatar
                            style={{ backgroundColor: "#87d068" }}
                            icon={<UserOutlined />}
                          />
                          <Avatar
                            style={{ backgroundColor: "#1677ff" }}
                            icon={<AntDesignOutlined />}
                          />
                        </Avatar.Group>
                      </S.Title>
                      <div style={{ marginTop: 5 }}>
                        <Tag color="#87d068">NodeJS</Tag>
                        <Tag color="#108ee9">
                          최대인원 10명 중 6명이 참여 중
                        </Tag>
                      </div>
                      <S.Contents>
                        I안녕하세요? 저희는 API 노예 Spring 개발자 2명이
                        있습니다.함께 ZEP 으로 학습 효과에 도움이 되는 방향으로
                        기능을 구현 할 예정입니다.외부 API 는 Chat-GPT 를 이용할
                        예정이고 관리자앱을 따로 만들어서 수강생들의 학습
                        성취도를 확인할 수 있는 앱을 만들 예정입니다. 소통이
                        잘되고, 적극적으로 참여할 귀중하신 프론트분 모십니다.
                        함께 해보고 싶으신 분들은 댓글이나 DM 보내주세용!!서로
                        배려하며 즐겁게 프로젝트해요!
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
