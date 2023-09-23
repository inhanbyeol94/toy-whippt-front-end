import styled from "styled-components";

export const S = {
    ModalContainer: styled.div`
      height: 500px;
      padding: 20px;
      overflow: auto;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.03);
    `,
    WriteTime: styled.div`
      color: gray;
      font-size: 13px;
      text-align: center;
    `,
    Bar: styled.hr`
      border-top: 1px;
      border-color: #D8D9DA;
      margin: 10px 0 10px 0;
    `,
    ChatBody: styled.div`
      margin-bottom: 30px;  
    `,
    UserName: styled.p`
      color: black;
    `,
    SubWriteTime: styled.span`
      color: gray;
      font-size: 12px;
      margin-left: 5px;
    `,
    QuestionData: styled.span`
      color: white;
      line-height: 1.5;      
      max-width: 700px;
      padding: 10px 15px;
      border-radius: 20px;
      display: inline-block;
      background-color: #1677ff;
      box-shadow: 0 5px 10px #F1F0E8
    `,
    AnswerData: styled.div`
      width: 70%;
      color: black;
      font-size: 15px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 30px;
      padding: 10px 25px 20px 25px;
      background-color: white;
      line-height: 1.5;
      box-shadow: 0 5px 10px #F1F0E8
    `,
}