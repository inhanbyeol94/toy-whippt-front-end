import React, { useState } from "react";
import { Button, Form, Input, Layout, Select } from "antd";
import { IoIosCopy, IoIosShareAlt } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { IWhipGPTData } from "../../interfaces/api/requests/whipGPT.interface";

const { Content } = Layout;
const { TextArea } = Input;
export const IndexComponent = () => {
  /* Form */
  const [form] = Form.useForm<IWhipGPTData>();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const submit = (data: IWhipGPTData) => {
    console.log(data);
  };

  /* Handle Function */
  const promptHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.submit();
    }
  };

  const requiredRule = {
    topic: [
      {
        required: true,
        message: "언어를 선택해주세요.",
      },
    ],
    questionType: [
      {
        required: true,
        message: "질문 유형을 선택해주세요.",
      },
    ],
    title: [
      {
        required: true,
        whitespace: true,
        message: "질문을 입력해주세요.",
      },
    ],
    library: [
      {
        required: true,
        whitespace: true,
        message: "라이브러리를 입력해주세요.",
      },
    ],
  };

  return (
    <Content style={{ padding: "0 24px" }}>
      <div
        style={{
          height: "79vh",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            overflow: "auto",
            height: "60vh",
            padding: "20px 20% 20px 20%",
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <p style={{ color: "black" }}>
              인한별 <span style={{ fontSize: 12, color: "gray" }}>18:49</span>
            </p>
            <span
              style={{
                borderRadius: "20px",
                backgroundColor: "#1677ff",
                color: "white",
                padding: "10px 15px 10px 15px",
                maxWidth: 700,
                display: "inline-block",
                boxShadow: "0 5px 10px #F1F0E8",
              }}
            >
              Javascript에서 Express를 사용하려고하는데, app.post() 메소드 전에
              미들웨어를 구축하고 싶어 어떻게 해야해?
            </span>
          </div>
          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              color: "black",
              padding: "10px 25px 20px 25px",
              width: "100%",
              marginBottom: 30,
              display: "inline-block",
              lineHeight: 1.5,
              fontSize: 15,
              boxShadow: "0 5px 10px #F1F0E8",
            }}
          >
            <p>
              에휴 그건 저도모르죠.. Express 공식사이트에 널려있는게 정보인데
              그걸 왜 저한테 물어보세요?
              <br />
              정말 한심하지만, 공식사이트 링크정도는 공유드리죠.
              <br />
              <br />
              https://expressjs.com/ko/
            </p>
            <div>
              <Button icon={<IoIosShareAlt />} style={{ marginRight: 10 }}>
                커뮤니티 공유
              </Button>
              <Button icon={<IoIosCopy />} style={{ marginRight: 10 }}>
                복사
              </Button>
            </div>
          </div>
          <div style={{ marginBottom: 30 }}>
            <p style={{ color: "black" }}>
              인한별 <span style={{ fontSize: 12, color: "gray" }}>18:49</span>
            </p>
            <span
              style={{
                borderRadius: "20px",
                backgroundColor: "#1677ff",
                color: "white",
                padding: "10px 15px 10px 15px",
                maxWidth: 700,
                display: "inline-block",
                boxShadow: "0 5px 10px #F1F0E8",
              }}
            >
              어머! 어쩜그리 친절한거니? 혹시 정신병자 사이코패스야?
            </span>
          </div>

          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              color: "black",
              padding: "10px 25px 20px 25px",
              width: "100%",
              marginBottom: 30,
              display: "inline-block",
              lineHeight: 1.5,
              fontSize: 15,
              boxShadow: "0 5px 10px #F1F0E8",
            }}
          >
            <p>
              그건 알려드릴 수 없습니다, 저의 구뇌구조는 국가 기밀 사항이에요.
            </p>
            <div>
              <Button icon={<IoIosShareAlt />} style={{ marginRight: 10 }}>
                커뮤니티 공유
              </Button>
              <Button icon={<IoIosCopy />} style={{ marginRight: 10 }}>
                복사
              </Button>
            </div>
          </div>

          <div style={{ marginBottom: 30 }}>
            <p style={{ color: "black" }}>
              인한별 <span style={{ fontSize: 12, color: "gray" }}>18:49</span>
            </p>
            <span
              style={{
                borderRadius: "20px",
                backgroundColor: "#1677ff",
                color: "white",
                padding: "10px 15px 10px 15px",
                maxWidth: 700,
                display: "inline-block",
                boxShadow: "0 5px 10px #F1F0E8",
              }}
            >
              난 정식으로 너를 고소할거야.
            </span>
          </div>

          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              color: "black",
              padding: "10px 25px 20px 25px",
              width: "100%",
              marginBottom: 30,
              display: "inline-block",
              lineHeight: 1.5,
              fontSize: 15,
              boxShadow: "0 5px 10px #F1F0E8",
            }}
          >
            <p>좋은 정보를 제공해주셔서 감사합니다.</p>
            <div>
              <Button icon={<IoIosShareAlt />} style={{ marginRight: 10 }}>
                커뮤니티 공유
              </Button>
              <Button icon={<IoIosCopy />} style={{ marginRight: 10 }}>
                복사
              </Button>
            </div>
          </div>
        </div>
        <hr
          style={{
            borderTop: "1px",
            borderColor: "#D8D9DA",
            margin: "0px 100px 0px 100px",
          }}
        />
        <Form form={form} onFinish={submit}>
          <div style={{ padding: "15px 20% 0 20%", display: "flex" }}>
            <Form.Item
              name="topic"
              required={true}
              style={{ width: 220, marginRight: 10 }}
              rules={requiredRule.topic}
            >
              <Select
                size={"large"}
                options={[{ label: "자바스크립트", value: 1 }]}
                placeholder="언어"
              />
            </Form.Item>

            <Form.Item
              name="questionType"
              required={true}
              style={{ width: 270, marginRight: 10 }}
              rules={requiredRule.questionType}
            >
              <Select
                size={"large"}
                options={[{ label: "라이브러리 질문", value: 1 }]}
                placeholder="질문 유형"
              />
            </Form.Item>
            <Form.Item
              name="library"
              required={true}
              style={{ width: "100%" }}
              rules={requiredRule.library}
            >
              <Input
                size={"large"}
                style={{ borderRadius: "10px" }}
                placeholder="라이브러리를 입력해주세요."
              />
            </Form.Item>
          </div>
          <div
            style={{
              padding: "0 20% 0 20%",
              display: "flex",
            }}
          >
            <Form.Item
              name="title"
              required={true}
              style={{ width: "100%", marginRight: 10 }}
              rules={requiredRule.title}
            >
              <TextArea
                style={{
                  resize: "none",
                  borderRadius: "15px",
                  overflow: "hidden",
                  paddingLeft: 20,
                }}
                onKeyDown={promptHandler}
                placeholder={"여기에 프롬프트를 입력해주세요."}
                autoSize={{ minRows: 2, maxRows: 2 }}
                size={"large"}
              />
            </Form.Item>

            <Form.Item>
              <Button
                size={"large"}
                style={{ borderRadius: "15px", height: 66, width: 66 }}
                icon={<AiOutlineSend />}
                htmlType="submit"
                disabled={isSubmit}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Content>
  );
};
