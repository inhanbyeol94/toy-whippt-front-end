import { Layout, theme } from "antd";
import { SidebarComponent } from "../components/whipGpt/Sidebar.component";
import { IndexComponent } from "../components/myQuestion/Index.component";
import React from "react";
import { ModalComponent } from "../components/utils/Modal.component";
import { MyQuestionModalComponent } from "../components/myQuestion/MyQuestion.modal.component";

const { Content, Sider } = Layout;
export const MyQuestions = () => {
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
          <IndexComponent />
        </Layout>
      </Content>
    </>
  );
};
