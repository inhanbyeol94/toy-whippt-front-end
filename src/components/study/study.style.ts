import {Form, Input, Layout, Button} from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
    Content: styled(Content)`
      padding: 0 50px;
      margin: 16px 0 0 0;
    `,
    AddRoomButton: styled(Button)`
      float: right;
      position: relative;
      background-color: lightgrey;
    `,
    StudyContainer: styled.div`
      display: flex;
      flex-direction: column;
      height: 84.7vh;
      padding: 30px 15% 0 15%;
      border-radius: 10px;
      background-color: var(--sub-color);
    `,
    SearchInput: styled(Input)`
      padding-left: 20px;
      margin-right: 10px;
      border-radius: 20px;
    `,
    ContentsContainer: styled.div`
      gap: 20px;
      padding: 20px                           ;
      height: 68vh;
      display: flex;
      overflow: auto;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin: 30px 0 30px 0;

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
    RoomBox: styled.div`
      width: 35%;
      height: 270px;
      padding: 50px;
      display: table;
      position: relative;
      border-radius: 10px;
      background-color: lightgrey;
    `,
    RoomContents: styled.div`
      gap: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
    Title: styled.span`
    font-size: 18px;
    font-weight: bold
    `,
    ButtonBox: styled.div`
      gap: 10px;
      bottom: 30px;
      display: flex;
      position: absolute;
    `,
}