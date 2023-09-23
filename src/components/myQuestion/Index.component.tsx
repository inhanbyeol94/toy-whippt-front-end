import React, { useEffect, useState } from "react";
import {
  Button,
  FloatButton,
  Form,
  List,
  message,
  Select,
  Tooltip,
} from "antd";
import { IoIosCopy, IoIosShareAlt } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { useGlobalStore } from "../../stores/global.store";
import { MyQuestionModalComponent } from "./MyQuestion.modal.component";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ISearchData } from "../../interfaces/api/requests/searchData.interface";
import { TbZoomReset } from "react-icons/tb";
import {
  IQuestion,
  IQuestionDetail,
  IQuestionStoreData,
} from "../../interfaces/api/results/question.interface";
import { useQuestionStore } from "../../stores/question.store";
import { useNavigate } from "react-router-dom";
import { S } from "./myQuestion.style";
import { useQuestionQueries } from "../../queries/question.query";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../../App";

export const IndexComponent = () => {
  /* InView */
  const [ref, inView] = useInView();

  /* Navigate */
  const navigate = useNavigate();

  /* Form */
  const [form] = Form.useForm<ISearchData>();

  /* State */
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState<IQuestionStoreData>();
  const [keywordData, setKeywordData] = useState<string | undefined>();

  /* Store */
  const { setHeader, setSpin, setModal, sendMessage } = useGlobalStore();
  const { setQuestion } = useQuestionStore();

  /* Query */
  const {
    findMyQuestionsQuery,
    findMyQuestionsIsSuccess,
    findMyQuestionsHasNextPage,
    findMyQuestionsFetchNextPage,
  } = useQuestionQueries(undefined, keywordData);

  /* Use Effect */
  useEffect(() => {
    setHeader(true);
    setSpin(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (inView && findMyQuestionsHasNextPage) {
      findMyQuestionsFetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return setIsLoading(false);
  }, [findMyQuestionsIsSuccess]);

  /* Function */
  const submit = (data: ISearchData) => {
    setKeywordData(data.searchData);
    queryClient.invalidateQueries(["findMyQuestions", keywordData]);
  };

  const goToWrite = (data: IQuestionStoreData) => {
    setQuestion(data);
    navigate("/write");
  };
  const showModal = (item: IQuestionStoreData) => {
    setModalData(item);
    setIsLoading(true);
    setModal(true);
    setIsLoading(false);
  };

  /* Component */
  return (
    <S.Content>
      <Form form={form} onFinish={submit}>
        <Form.Item name="searchData" required={true}>
          <S.SearchInput
            size={"large"}
            placeholder={"검색할 이전 프롬포트를 입력해주세요."}
            disabled={isLoading}
            suffix={
              <AiOutlineSearch cursor="pointer" onClick={() => form.submit()} />
            }
          />
        </Form.Item>
      </Form>

      <S.ListContainer>
        <List
          itemLayout="vertical"
          size={"large"}
          loading={isLoading}
          dataSource={findMyQuestionsQuery?.pages}
          renderItem={(data, index) => (
            <React.Fragment key={index}>
              {data[0].map((item) => (
                <List.Item key={item.id}>
                  <S.Title>{item.query}</S.Title>
                  <S.CreationTime>
                    {new Date(item.createdAt).toLocaleString()}
                  </S.CreationTime>
                  <S.Answer>{item.answer}</S.Answer>
                  <S.ButtonBox>
                    <Button
                      icon={<IoIosShareAlt />}
                      loading={isLoading}
                      onClick={() => goToWrite(item)}
                    >
                      커뮤니티 공유
                    </Button>
                    <CopyToClipboard
                      text={`[질문] ${item.topic} / ${item.type} ${
                        item.library ? ` / ${item.library}` : ""
                      } \n${item.query}\n\n[답변]\n${item.answer}`}
                      onCopy={() => {
                        sendMessage("success", "클립보드에 복사되었습니다.");
                      }}
                    >
                      <Button icon={<IoIosCopy />}>복사</Button>
                    </CopyToClipboard>
                    <Button
                      icon={<IoDocumentText />}
                      loading={isLoading}
                      onClick={() => showModal(item)}
                    >
                      자세히 보기
                    </Button>
                  </S.ButtonBox>
                </List.Item>
              ))}
            </React.Fragment>
          )}
        />
        <div ref={ref} style={{ color: "white" }}>
          .
        </div>
      </S.ListContainer>
      <MyQuestionModalComponent questionData={modalData} />
    </S.Content>
  );
};
