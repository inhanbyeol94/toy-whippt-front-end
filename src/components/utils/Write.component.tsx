import { Button, Form, Input } from "antd";
import { useQuestionStore } from "../../stores/question.store";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { usePostQueries } from "../../queries/post.query";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../stores/global.store";
import { useEditPostStore } from "../../stores/editPost.store";

export const WriteComponent = () => {
  const { question, resetQuestion } = useQuestionStore();
  const navagate = useNavigate();

  /* Store */
  const { setHeader, sendMessage } = useGlobalStore();
  const { postData, resetPostData } = useEditPostStore();

  /* Query */
  const { newPost, editPostMutation } = usePostQueries();

  /* State */
  const [value, setValue] = useState<string | undefined>("");
  const [editSend, setEditSend] = useState<boolean>(false);

  /* useEffect */

  useEffect(() => {
    if (postData.postId) {
      form.setFieldValue("title", postData.title);
      setValue(postData.content);
      setEditSend(true);
    }
  }, [postData]);

  useEffect(() => {
    setHeader(true);
  }, []);

  useEffect(() => {
    if (question?.title) {
      setValue(` 
## GPT 응답 결과
    ${question.topic} / ${question.questionType} / ${question.library}

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
    if (!value) return sendMessage("error", "본문을 입력해주세요.");

    if (editSend) {
      editPostMutation.mutate(
        { title, content: value, postId: postData.postId },
        {
          onSuccess: () => {
            resetPostData();
            sendMessage("success", "게시글이 정상 수정되었습니다.");
            setEditSend(false);
            navagate(`/community/documents/${postData.postId}`);
          },
          onError: (error) => {
            if (error?.status) return sendMessage("error", error?.message);
            console.error(error);
            sendMessage("error", "오류가 발생했습니다.");
          },
        },
      );
    } else {
      newPost.mutate(
        { title, content: value },
        {
          onSuccess: (data) => {
            sendMessage("success", "정상 등록되었습니다.");
            navagate(`/community/documents/${data.id}`);
          },
          onError: (error) => {
            if (error?.status) return sendMessage("error", error?.message);
            console.error(error);
            sendMessage("error", "오류가 발생했습니다.");
          },
        },
      );
    }
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
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
