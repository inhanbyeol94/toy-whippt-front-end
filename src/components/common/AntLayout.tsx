import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Footer } = Layout;
const AntLayout = () => {
  /* Use Navigate */
  const navigate = useNavigate();

  /* Handle Function */
  const logout = async (): Promise<void> => {
    alert("target");
  };

  /* Etc */
  const path = useLocation().pathname.replace("/", "") || "index";

  /* Component */
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
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
            onClick: () => navigate("/"),
          },
          {
            key: "my/questions",
            label: "내질문",
            onClick: () => navigate("/my/questions"),
          },
          {
            key: "community",
            label: "커뮤니티",
            onClick: () => navigate("/community"),
          },
          { key: "study", label: "스터디", onClick: () => navigate("/study") },
        ]}
      />
      <Menu
        theme="dark"
        selectable={false}
        items={[
          {
            key: "logout",
            label: "로그아웃",
            onClick: logout,
          },
        ]}
      />
    </Header>
  );
};

const AntFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      항해커톤 프로젝트 ©2023 Created by 채찍피티
    </Footer>
  );
};

export { AntLayout, AntFooter };