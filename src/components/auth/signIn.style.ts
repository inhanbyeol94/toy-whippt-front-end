import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
    Content: styled(Content)`
    padding: 0 24px;
    `,
    Container: styled.div`
      height: 79vh;
      background-color: rgba(0, 0, 0, 0.03);
      border-radius: 10px;
    `,
    LoginBox: styled.div`
      width: 400px;
      height: 200px;
      background-color: var(--sub-color);
    `
}