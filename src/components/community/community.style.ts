import { Form, Input, Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
  SearchInput: styled(Input)`
    padding-left: 20px;
    margin-right: 10px;
    border-radius: 20px;
  `,
  SelectBox: styled.div`
    display: flex;
  `,
  Language: styled(Form.Item)`
    width: 120px;
    margin-right: 10px;
  `,
  QuestionType: styled(Form.Item)`
    width: 185px;
    margin-right: 10px;
  `,
  Library: styled(Form.Item)`
    width: 30%;
  `,
  LibraryInput: styled(Input)`
    border-radius: 5px;
  `,
  ListContainer: styled.div`
    height: 68vh;
    overflow: auto;
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
  Content: styled(Content)`
    padding: 0 50px;
    margin: 16px 0 0 0;
  `,
  CommunityContainer: styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 84.7vh;
    padding: 30px 15% 0 15%;
    border-radius: 10px;
    background-color: var(--sub-color);

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
    cursor: pointer;
    font-size: 20px;
  `,
  Contents: styled.div`
    margin-top: 15px;
  `,

  Info: styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin-top: 15px;
    color: gray;
  `,
};
