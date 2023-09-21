import {Form, Input, Layout} from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
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
        background-color: #F0F0F0;
        border: 1px solid #F0F0F0;
        border-radius: 12px;
      }
    `,
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
      width: 150px;
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
      margin-top: 50px;
      overflow: auto;

      // 스크롤바 전체 영역
      &::-webkit-scrollbar {
        width: 7px;
      }
      // 스크롤바 막대
      &::-webkit-scrollbar-thumb {
        background-color: #F0F0F0;
        border: 1px solid #F0F0F0;
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
}