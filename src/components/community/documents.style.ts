import { Layout, Input } from "antd";
import styled from "styled-components";

const { Content } = Layout;
const { TextArea } = Input;

export const S = {
  Content: styled(Content)`
    padding: 0 50px;
    background-color: var(--sub-color);
  `,

  DocumentsContainer: styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 86.4vh;
    padding: 30px 25% 0 25%;
    border-radius: 10px;

    // 스크롤바 전체 영역
    &::-webkit-scrollbar {
      width: 7px;
    }

    // 스크롤바 막대
    &::-webkit-scrollbar-thumb {
      background-color: #f0f0f0;
      border: 1px solid #f0f0f0;
      border-radius: 12px;
    }
  `,
  Title: styled.div`
    font-size: 32px;
    font-weight: bold;
  `,
  DocumentBody: styled.div`
    min-height: 53vh;
  `,
  CommentContainer: styled.div`
    gap: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  `,
  CommentTop: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Comment: styled.p`
    font-size: 16px;
    font-weight: bold;
  `,
  CommentBox: styled.div`
    gap: 20px;
    display: flex;
    justify-content: space-between;
  `,
  UserBox: styled.div`
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  ImageBox: styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  TextArea: styled(TextArea)`
    resize: none;
    border-radius: 15px;
    overflow: hidden;
    padding-left: 20px;
  `,
};
