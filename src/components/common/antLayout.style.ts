import styled from "styled-components";
import { Layout } from "antd";

const { Header, Footer } = Layout;

export const S = {
  Header: styled(Header)`
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    height: 6.8vh;
  `,

  ProfileImg: styled.img`
    width: 40px;
    height: 40px;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
  `,

  Footer: styled(Footer)`
    text-align: center;
    height: 6.8vh;
  `,
};
