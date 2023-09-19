import { IndexComponent } from "../components/whipGpt/Index.component";
import { Layout, theme } from "antd";
import { SidebarComponent } from "../components/whipGpt/Sidebar.component";
import React from "react";

const { Content, Sider } = Layout;
export const WhipGPT = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Content style={{ padding: "0 50px", margin: "16px 0 0px 0" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: 10,
            height: "84vh",
          }}
        >
          <SidebarComponent bgColor={colorBgContainer} />
          <IndexComponent />
        </Layout>
      </Content>
    </>
  );
};
