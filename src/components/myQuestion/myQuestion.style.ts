import styled from "styled-components";
import {
    Form,
    Input,
    Layout,
} from "antd";

const { Content } = Layout;
const { Search } = Input;

export const S = {
    Content: styled(Content)`
      padding: 10px 15% 0 15%;
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
      height: 62vh;
      overflow: auto;
      margin-top: 20px;

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
      font-size: 20px;
    `,
    CreationTime: styled.span`
      color: gray;
      font-size: 14px;
    `,
    Answer: styled.div`
      margin-top: 15px;
    `,
    ButtonBox: styled.div`
      gap: 10px;
      display: flex;
      margin-top: 20px;
    `,
}