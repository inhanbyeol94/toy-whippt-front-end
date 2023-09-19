import React from "react";
import { Layout, Menu } from "antd";
import { IProp } from "../../interfaces/prop.interface";

const { Sider } = Layout;

export const SidebarComponent = ({ bgColor }: IProp) => {
  return (
    <Sider
      style={{
        background: bgColor,
      }}
      width={300}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        style={{ overflow: "auto", height: "79vh" }}
        items={[
          {
            key: "sub1",
            label: "최근 질문내역",
            children: [
              {
                key: "1",
                label: "자바스크립트란?",
              },
              {
                key: "2",
                label: "Express는 어떻게 쓰는거야?",
              },
              {
                key: "3",
                label: "nestjs에서 prisma를 사용하는 방법",
              },
              {
                key: "4",
                label: "react는 프론트야?",
              },
              {
                key: "5",
                label: "심재두를 알려줘",
              },
              {
                key: "6",
                label: "유지은이 사람이야?",
              },
              {
                key: "7",
                label: "김종현은 무슨언어야?",
              },
              {
                key: "8",
                label: "난 김혜림을 알아 넌?",
              },
              {
                key: "9",
                label: "강영규는 한국인이야?",
              },
              {
                key: "10",
                label: "글자가 길어지면 숨김처리가 돼?dddddddddddd",
              },
              {
                key: "11",
                label: "오 되네?",
              },
              {
                key: "12",
                label: "류원희는 류승범과 사촌관계일까? 내가볼땐 맞는듯",
              },
              {
                key: "13",
                label: "15개 까지가 적당할거 같은데?",
              },
              {
                key: "14",
                label: "확실해?",
              },
              {
                key: "15",
                label: "ㅇㅇ 확실해 여기까지 좋은듯",
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};
