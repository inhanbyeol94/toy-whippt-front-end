import { Layout } from "antd";
import React from "react";
import { WriteComponent } from "../components/utils/Write.component";
import styled from "styled-components";

const { Content} = Layout;
export const Write = () => {

  return (
    <>
      <S.Content>
        <S.Layout>
          <WriteComponent />
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