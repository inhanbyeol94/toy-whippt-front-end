import { Button, Form, Input } from "antd";
import { useQuestionStore } from "../../stores/question.store";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

export const WriteComponent = () => {
  const { question, resetQuestion } = useQuestionStore();

  /* useState */
  const [value, setValue] = useState<string | undefined>("");

  /* useEffect */
  useEffect(() => {
    if (question?.title) {
      setValue(`## GPT 응답 결과

> **질문.**
> *${question?.title}*
> 
> **답변.**
> *${question?.answer}*

## 본문`);

      resetQuestion();
    }
  }, [question]);

  /* Form */
  const [form] = Form.useForm<{ title: string; content: string }>();

  /* Function */
  const submit = ({ title }: { title: string }) => {
    if (!value) return alert("본문을 입력해주세요.");
  };

  return (
    <div style={{ padding: "50px 15% 10px 15%" }}>
      <Form form={form} onFinish={submit}>
        <Form.Item
          name="title"
          required={true}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "제목을 입력해주세요.",
            },
          ]}
        >
          <Input size="large" placeholder="제목을 입력해주세요." />
        </Form.Item>
        <Form.Item
          required={true}
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
          data-color-mode="light"
        >
          <MDEditor
            value={value}
            preview="live"
            height={550}
            // commands={[...commands.getCommands(), help]}
            onChange={(val) => setValue(val)}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" size="large" htmlType="submit">
            작성
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
