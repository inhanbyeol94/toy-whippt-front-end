import React, { useEffect } from "react";
import { Menu, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { S } from "./antLayout.style";
import { useAuthQueries } from "../../queries/auth.query";
import { useGlobalStore } from "../../stores/global.store";

const { Item, SubMenu } = Menu;
const AntLayout = () => {
  /* Message */
  const [messageApi, contextHolder] = message.useMessage();

  /* Query */
  const { logout } = useAuthQueries();

  /* Store */
  const { setSpin, userInfo, msg } = useGlobalStore();

  /* Use Navigate */
  const navigate = useNavigate();

  /* useEffect */
  useEffect(() => {
    if (msg[1]) return messageApi.open({ type: msg[0], content: msg[1] });
  }, [msg]);

  /* Handle Function */
  const logoutHandler = () => {
    logout.mutate(undefined, {
      onSuccess: (data) => {
        if (data.result === true) {
          setSpin(true);
          navigate("/login");
        }
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  /* Etc */
  const path = useLocation().pathname.replace("/", "") || "index";

  /* Component */
  return (
    <S.Header>
      <Menu
        theme="dark"
        selectable={false}
        style={{ marginRight: 20 }}
        items={[
          {
            key: "logo",
            label: (
              <img
                src="/logo.png"
                style={{ width: 160, objectFit: "cover" }}
                alt="logo"
              />
            ),
          },
        ]}
      />

      <Menu
        theme="dark"
        mode="horizontal"
        style={{ width: "100%" }}
        defaultSelectedKeys={[path]}
        items={[
          {
            key: "index",
            label: "항해피티",
            onClick: () => {
              navigate("/");
            },
          },
          {
            key: "my/questions",
            label: "내 질문",
            onClick: () => {
              navigate("/my/questions");
            },
          },
          {
            key: "community",
            label: "커뮤니티",
            onClick: () => {
              navigate("/community");
            },
          },
          {
            key: "study",
            label: "스터디",
            onClick: () => {
              navigate("/study");
            },
          },
        ]}
      />
      <Menu theme="dark" selectable={false} mode="horizontal">
        <SubMenu
          key="profile"
          title={<S.ProfileImg src={userInfo?.profileImgUrl} />}
        >
          <Menu.Item key="chat" children="쪽지함" />
          <Menu.Item key="logout" children="로그아웃" onClick={logoutHandler} />
        </SubMenu>
      </Menu>
      {contextHolder}
    </S.Header>
  );
};

const AntFooter = () => {
  return <S.Footer>항해커톤 프로젝트 ©2023 Created by 항해피티</S.Footer>;
};

export { AntLayout, AntFooter };
