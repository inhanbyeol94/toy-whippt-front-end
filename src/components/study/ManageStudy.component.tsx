import { ModalComponent } from "../utils/Modal.component";
import { Button, Form, Input, Select } from "antd";
import { S } from "./study.style";
import { useGlobalStore } from "../../stores/global.store";
import React from "react";

export const ManageStudyComponent = () => {
  return (
    <>
      <S.Content>
        <S.CommunityContainer>
          <div
            style={{
              padding: "200px 25% 0 25%",
            }}
          >
            <Form>
              <Form.Item name="TEST" label="스터디명" required={true}>
                <Input size={"large"} />
              </Form.Item>
              <Form.Item name="TEST" required={true}>
                <Input size={"large"} />
              </Form.Item>
              <Form.Item name="TEST" required={true}>
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
              <Form.Item name="TEST" required={true}>
                <Input size={"large"} />
              </Form.Item>
            </Form>
          </div>
        </S.CommunityContainer>
      </S.Content>
    </>
  );
};
