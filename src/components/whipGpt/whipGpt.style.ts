import { Button, Form, Input, Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;
const { TextArea } = Input;

export const S = {
    Content: styled(Content)`
      padding: 0 24px;
      overflow: hidden;
    `,
    Container: styled.div`
      height: 79vh;
      background-color: rgba(0, 0, 0, 0.03);
      border-radius: 10px;
    `,
    ChatContainer: styled.div`
      display: flex;
      flex-direction: column;
      overflow: auto;
      height: 64vh;
      padding: 20px 20% 20px 20%;
      
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
    ChatBox: styled.div`
      display: flex;
      flex-direction: column;
      gap: 30px;
    `,
    WriteContent: styled.div`
      display: flex;
      flex-direction: column;
      gap: 15px;
    `,
    CreationTime: styled.span`
    font-size: 12px;
      color: gray;
    `,
    CreatedContent: styled.span`
      border-radius: 20px;
      background-color: #1677ff;
      color: white;
      padding: 10px 15px 10px 15px;
      line-height: 1.5;
      max-width: 700px;
      display: inline-block;
      box-shadow: 0 3px 5px #f1f0e8;
    `,
    AnswerContent: styled.div`
      border-radius: 20px;
      background-color: white;
      color: black;
      padding: 10px 25px 20px 25px;
      width: 100%;
      display: inline-block;
      line-height: 1.5;
      font-size: 15px;
      box-shadow: 0 3px 5px #f1f0e8;
      margin-bottom: 30px;
    `,
    Bar: styled.hr`
      border-top: 1px;
      border-color: #d8d9da;
      margin: 0 100px 0 100px;
    `,
    ButtonBox: styled.div`
      gap: 10px;
      display: flex;
      margin-top: 10px;
    `,
    FormBox: styled.div`
      display: flex;
      padding: 15px 20% 0 20%;
    `,
    FormTitle: styled(Form.Item)`
      width: 100%;
      margin-right: 10px;
    `,
    Language: styled(Form.Item)`
      width: 220px;
      margin-right: 10px;
    `,
    QuestionType: styled(Form.Item)`
      width: 270px;
      margin-right: 10px;
    `,
    Library: styled(Form.Item)`
      width: 100%;
    `,
    LibraryInput: styled(Input)`
      border-radius: 10px;
    `,
    TextAreaBox: styled.div`
      display: flex;
      padding: 0 20% 0 20%;
    `,
    TextArea: styled(TextArea)`
      resize: none;
      border-radius: 15px;
      overflow: hidden;
      padding-left: 20px;
    `,
    SendButton: styled(Button)`
      width: 55px !important;
      height: 55px;
      border-radius: 15px;
    `,
}
