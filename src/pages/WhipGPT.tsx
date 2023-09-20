import { IndexComponent } from "../components/whipGpt/Index.component";
import { Layout } from "antd";
import { SidebarComponent } from "../components/whipGpt/Sidebar.component";
import React from "react";
import styled from "styled-components";

const { Content} = Layout;
export const WhipGPT = () => {
  return (
    <>
      <S.Content>
        <S.Layout>
          <SidebarComponent/>
          <IndexComponent />
        </S.Layout>
      </S.Content>
    </>
  );
};

const S = {
    Content: styled(Content)`
      padding: 0 50px;
      margin: 16px 0 0 0;
    `,
    Layout: styled(Layout)`
      height: 84vh;
      padding: 24px 0;
      border-radius: 10px;
      background-color: var(--sub-color);
    `,
}