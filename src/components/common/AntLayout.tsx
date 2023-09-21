import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { S } from "./antLayout.style";
import { useAuthQueries } from "../../queries/auth.query";
import { useGlobalStore } from "../../stores/global.store";

const { Item, SubMenu } = Menu;
const AntLayout = () => {
  /* Query */
  const { logout, userInfoData } = useAuthQueries();

  /* Store */
  const { setSpin } = useGlobalStore();

  /* Use Navigate */
  const navigate = useNavigate();

  /* Handle Function */
  const logoutHandler = () => {
    logout.mutate(undefined, {
      onSuccess: (data) => {
        if (data.result == true) {
          setSpin(true);
          navigate("/login");
        }
      },
      onError: (error) => {
        console.log(error.message);
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
            label: "logo",
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
          title={<S.ProfileImg src={userInfoData?.profileImgUrl} />}
        >
          <Menu.Item key="logout" children="로그아웃" onClick={logoutHandler} />
        </SubMenu>
      </Menu>
    </S.Header>
  );
};

const AntFooter = () => {
  return <S.Footer>항해커톤 프로젝트 ©2023 Created by 채찍피티</S.Footer>;
};

export { AntLayout, AntFooter };
