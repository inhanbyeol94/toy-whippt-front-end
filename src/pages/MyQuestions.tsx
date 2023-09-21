import { Layout } from "antd";
import { IndexComponent } from "../components/myQuestion/Index.component";
import React from "react";
import styled from "styled-components";

const { Content } = Layout;
export const MyQuestions = () => {

  return (
    <>
      <S.Content>
        <S.Layout>
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
      height: 84.7vh;
      padding: 24px 0;
      border-radius: 10px;
      background-color: var(--sub-color);
    `,
}