import { ModalComponent } from "../utils/Modal.component";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { S } from "./study.style";
import { useGlobalStore } from "../../stores/global.store";
import React, { useEffect, useState } from "react";
import Textarea from "@uiw/react-md-editor/lib/components/TextArea/Textarea";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { ICreateStudy } from "../../interfaces/api/requests/createStudy.interface";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;
import { useStudyQueries } from "../../queries/study.query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export const ManageStudyComponent = () => {
  /* InView */
  const [ref, inView] = useInView();

  /* Navigator*/
  const navigate = useNavigate();

  /* Form */
  const [form] = Form.useForm<ICreateStudy>();

  /* Store */
  const { setHeader, setSpin, sendMessage } = useGlobalStore();

  /* Query */
  const { createStudyMutation } = useStudyQueries();

  /* Effect */
  useEffect(() => {
    setHeader(true);
    setSpin(false);
  }, []);

  /* Function */
  const submit = (data: ICreateStudy) => {
    createStudyMutation.mutate(data, {
      onSuccess: () => {
        navigate("/study");
        sendMessage("success", "스터디가 개설되었습니다.");
      },
      onError: (error) => {
        if (error?.status) return sendMessage("error", error.message);
        console.error(error);
        sendMessage("error", "오류가 발생하였습니다.");
      },
    });
  };

  return (
    <>
      <S.Content>
        <S.CommunityContainer>
          <div
            style={{
              padding: "100px 25% 0 25%",
            }}
          >
            <Form form={form} layout="vertical" onFinish={submit}>
              <Form.Item
                name="title"
                label="스터디명"
                required={true}
                rules={[
                  { required: true, message: "스터디명을 입력해주세요." },
                ]}
              >
                <Input size={"large"} placeholder="스터디명을 입력해주세요." />
              </Form.Item>
              <Form.Item
                name="content"
                label="설명"
                rules={[{ required: true, message: "설명을 입력해주세요." }]}
              >
                <TextArea placeholder="스터디 설명을 입력해주세요."></TextArea>
              </Form.Item>
              <Form.Item
                name="topic"
                label="사용 언어"
                required={true}
                rules={[{ required: true, message: "언어를 선택해주세요." }]}
              >
                <Select
                  size="large"
                  options={[
                    { label: "Java", value: "JAVA" },
                    { label: "JavaScript", value: "JAVASCRIPT" },
                    { label: "Kotlin", value: "KOTLIN" },
                    { label: "React", value: "REACT" },
                    { label: "Next.js", value: "NEXTJS" },
                    { label: "Node.js", value: "NODEJS" },
                    { label: "Nest.js", value: "NESTJS" },
                    { label: "Spring", value: "SPRING" },
                    { label: "CS", value: "COMPUTER SCIENCE" },
                  ]}
                  placeholder="언어"
                />
              </Form.Item>
              <Form.Item
                name="maxCount"
                label="최대 인원"
                required={true}
                rules={[
                  { required: true, message: "최대 인원을 설정해주세요." },
                ]}
              >
                <InputNumber size={"large"} placeholder="1" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button htmlType="submit">등록</Button>
              </Form.Item>
            </Form>
          </div>
          <div ref={ref} style={{ color: "white" }}>
            .
          </div>
        </S.CommunityContainer>
      </S.Content>
    </>
  );
};
