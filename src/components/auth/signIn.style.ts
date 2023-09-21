import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
  Content: styled(Content)`
    padding: 0 24px;
  `,
  Container: styled.div`
    height: 93.2vh;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  LoginBox: styled.div`
    width: 400px;
    height: 200px;
    border-radius: 10px;
    background-color: var(--sub-color);
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
