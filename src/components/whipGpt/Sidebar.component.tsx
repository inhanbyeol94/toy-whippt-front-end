import React, { useEffect, useState } from "react";
import { Button, Menu, Tooltip } from "antd";
import { S } from "./sidebar.style";
import { useQuestionQueries } from "../../queries/question.query";
import SubMenu from "antd/es/menu/SubMenu";
import { useGlobalStore } from "../../stores/global.store";
import { useQuestionsStore } from "../../stores/questions.store";
import { findRecentQuestionList } from "../../api/question.api";
import { GrFormClose } from "react-icons/gr";

export const SidebarComponent = () => {
  /* Query */
  const { findRecentQuestionListQuery, findRecentQuestionListQueryLoading } =
    useQuestionQueries();

  /* State */
  const [firstKey, setFirstKey] = useState("");

  /* Store */
  const { setIsForm, setQuestionId, questionId } = useQuestionsStore();

  /* Effect */
  useEffect(() => {
    if (questionId) {
      moveQuestionRoom(questionId);
      return setFirstKey(questionId);
    }
  }, []);

  useEffect(() => {
    if (!questionId) {
      if (typeof findRecentQuestionListQuery !== "object") return;
      if (findRecentQuestionListQuery.length === 0) return;
      if (findRecentQuestionListQuery.length === 1) {
        moveQuestionRoom(findRecentQuestionListQuery[0].id);
        return setFirstKey(findRecentQuestionListQuery[0].id);
      } else {
        moveQuestionRoom(
          findRecentQuestionListQuery[findRecentQuestionListQuery.length - 1]
            .id,
        );
        return setFirstKey(
          findRecentQuestionListQuery[findRecentQuestionListQuery.length - 1]
            .id,
        );
      }
    }
  }, [findRecentQuestionListQuery]);

  /* Function */
  const moveQuestionRoom = (questionId: string) => {
    setIsForm(false);
    setQuestionId(questionId);
    setFirstKey(questionId);
  };

  return findRecentQuestionListQuery?.length === 0 ? null : (
    <S.Sider width={300}>
      <Menu
        mode="inline"
        defaultOpenKeys={["list"]}
        selectedKeys={[firstKey]}
        style={{ overflow: "auto", height: "80vh" }}
      >
        <SubMenu key="list" title="최근 질문내역">
          {findRecentQuestionListQuery?.map((info) => (
            <Menu.Item key={info.id} onClick={() => moveQuestionRoom(info.id)}>
              {info.title || "질문을 시작해보세요!"}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </S.Sider>
  );
};
