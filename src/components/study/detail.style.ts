import {Layout} from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const S = {
    Content: styled(Content)`
      padding: 0 50px;
      margin: 16px 0 0 0;
    `,
    DetailContainer: styled.div`
      display: flex;
      flex-direction: column;
      height: 84.7vh;
      padding: 30px 15% 0 15%;
      border-radius: 10px;
      background-color: var(--sub-color);
    `,
    Title: styled.span`
      font-size: 20px;
      font-weight: bold;
      line-height: 3;
      margin-bottom: 20px;
      border-bottom: 1px solid lightgrey;
    `,
    ContentsContainer: styled.div`
      height: 68vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      
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
    Contents: styled.div`
      min-height: 43vh;
      line-height: 1.5;
      margin-bottom: 15px;
      word-break:break-all;
    `,
    ButtonBox: styled.div`
      gap: 10px;
      float: right;
      display: flex;
      margin-top: 20px;
    `,
    Participant: styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    Personnel: styled.span`
      font-size: 15px;
      font-weight: bold;
      margin-right: 15px;
      margin-bottom: 15px;
    `,
    NumberOfPersonnel: styled.span`
      font-size: 15px;
    `,
    PersonnelContainer: styled.div`
      gap: 20px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      flex-direction: row;
    `,
    PersonnelBox: styled.div`
      gap: 20px;
      min-width: 230px;
      display: flex;
      border-radius: 10px;
      border: 2px solid lightgrey;
      justify-content: center;
      padding: 15px 10px 15px 10px;
    `,
    ImageBox: styled.div`
      width: 45px;
      height: 45px;
      border: 1px solid gray;
      overflow: hidden;
      border-radius: 50%;
    `,
    Img: styled.img`
      width: 100%;
      height: 100%;
      object-fit: cover;
    `,
    User: styled.div`
      gap: 7px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    NickName: styled.span`
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    `,
}