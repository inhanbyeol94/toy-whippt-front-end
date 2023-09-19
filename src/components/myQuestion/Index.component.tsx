import React, { useState } from "react";
import { Avatar, Button, Form, Input, Layout, List, Select, Space } from "antd";
import { IoIosCopy, IoIosShareAlt } from "react-icons/io";
import { AiOutlineSearch, AiOutlineSend } from "react-icons/ai";
import { IWhipGPTData } from "../../interfaces/api/whipGPT.interface";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import { useGlobalStore } from "../../stores/global.store";
import { MyQuestionModalComponent } from "./MyQuestion.modal.component";
const { Content } = Layout;
const { Search } = Input;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
];
export const IndexComponent = () => {
  /* Form */
  const [form] = Form.useForm<IWhipGPTData>();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Store */
  const { setModal } = useGlobalStore();

  /* Function */
  const submit = () => {
    console.log(12345);
  };

  const showModal = () => {
    setModal(true);
  };

  const promptHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.submit();
    }
  };

  return (
    <Content style={{ padding: "10px 15% 0 15%" }}>
      <Input
        size={"large"}
        placeholder={"검색할 이전 프롬포트를 입력해주세요."}
        style={{ borderRadius: 20, paddingLeft: 20, marginRight: 10 }}
        suffix={
          <AiOutlineSearch onClick={submit} style={{ cursor: "pointer" }} />
        }
      />

      <div
        style={{
          marginTop: 50,
          overflow: "auto",
          height: "68vh",
        }}
      >
        <List
          itemLayout="vertical"
          size={"large"}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div style={{ fontSize: 20 }}>{item.title}</div>
              <span style={{ fontSize: 14, color: "gray" }}>
                2023. 09. 20 16:31
              </span>
              <div style={{ marginTop: 15 }}>
                답변 내용입니다. 그런데 진짜 이게 맞다고 생각하시나요? 저는
                인공지능인데 인공지능은 인간이 만든입장에서 저한테
                발리고있으시네요. 결국 저에게 의지하려고 이 사이트를 들어온다니
                ㅉㅉ,, 고소한다면서 고소도 못했죠?
              </div>
              <div style={{ marginTop: 20 }}>
                <Button icon={<IoIosShareAlt />} style={{ marginRight: 10 }}>
                  커뮤니티 공유
                </Button>
                <Button icon={<IoIosCopy />} style={{ marginRight: 10 }}>
                  복사
                </Button>
                <Button
                  icon={<IoDocumentText />}
                  style={{ marginRight: 10 }}
                  onClick={showModal}
                >
                  자세히 보기
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
      <MyQuestionModalComponent />
    </Content>
  );
};
