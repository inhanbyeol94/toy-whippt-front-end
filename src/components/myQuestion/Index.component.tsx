import React, { useEffect, useState } from "react";
import {
    Button,
    FloatButton,
    Form,
    List,
    message, Select,
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
import { IQuestion } from "../../interfaces/api/results/question.interface";
import { useQuestionStore } from "../../stores/question.store";
import { useNavigate } from "react-router-dom";
import { S } from './myQuestion.style'

const data: IQuestion[] = [
  {
    title: "디피티야.. 리액트는 대신안해주는거야?",
    answer:
      "답변 내용입니다. 그런데 진짜 이게 맞다고 생각하시나요? 저는 인공지능인데 인공지능은 인간이 만든입장에서 저한테 발리고있으시네요. 결국 저에게 의지하려고 이 사이트를 들어온다니 ㅉㅉ,, 고소한다면서 고소도 못했죠?",
    createdAt: new Date("2023-09-21 22:21:41"),
    nickname: "인한별",
    topic: "Javascript",
    questionType: "웹 개발",
    library: "Express",
    questionId: 3,
  },
  {
    title:
      "몽고DB는 몽골에서 만든거야? 솔직히 이 생각한 사람 나만 있진 않을걸?",
    answer:
      "너랑은 수준낮아서 더이상 대화가 어려울 것 같아요. 그럼 김치는 김씨가 만들었나요? 하하하 개웃기네요 덕분에 재능찾아 개그맨 공채오디션 보러가요~",
    createdAt: new Date("2023-09-21 22:21:45"),
    nickname: "인한별",
    topic: "Javascript",
    questionType: "웹 개발",
    library: "Mongodb",
    questionId: 4,
  },
];
export const IndexComponent = () => {
  /* Navigate */
  const navigate = useNavigate();

  /* Antd Message */
  const [messageApi, contextHolder] = message.useMessage();

  /* Form */
  const [form] = Form.useForm<ISearchData>();

  /* State */
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState<IQuestion>();

  /* Store */
  const { setHeader, setSpin, setModal } = useGlobalStore();
  const { setQuestion } = useQuestionStore();

  useEffect(() => {
    setHeader(true);
    setSpin(false);
  }, []);

  /* Use Effect */
  useEffect(() => {
    setIsLoading(false);
  }, []);

  /* Function */
  const submit = (data: ISearchData) => {
    alert("target");
  };

  const goToWrite = (data: IQuestion) => {
    setQuestion(data);
    navigate("/write");
  };
  const showModal = (item: IQuestion) => {
    setModalData(item);
    setIsLoading(true);
    setModal(true);
    setIsLoading(false);
  };
  const resetSearchData = () => {
    alert("target");
  };

  const formRules = [
    {
      required: true,
      whitespace: true,
      message: "검색할 내용을 입력해주세요.",
    },
  ];

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

  /* Component */
  return (
    <S.Content>
      {contextHolder}
      <Form form={form} onFinish={submit}>
        <Form.Item name="searchData" required={true} rules={formRules}>
          <S.SearchInput
            size={"large"}
            placeholder={"검색할 이전 프롬포트를 입력해주세요."}
            disabled={isLoading}
            suffix={
              <AiOutlineSearch cursor="pointer"
                onClick={() => form.submit()}
              />
            }
          />
        </Form.Item>
      </Form>
        <S.SelectBox>
            <S.Language
                name="topic"
                required={true}
                rules={requiredRule.topic}
            >
                <Select
                    size="small"
                    options={[{ label: "Java", value: 1 },
                        { label: "JavaScript", value: 2 },
                        { label: "Kotlin", value: 3 },
                        { label: "React", value: 4 },
                        { label: "Next.js", value: 5 },
                        { label: "Node.js", value: 6 },
                        { label: "Nest.js", value: 7 },
                        { label: "Spring", value: 8 }]}
                    placeholder="언어"
                />
            </S.Language>

            <S.QuestionType
                name="questionType"
                required={true}
                rules={requiredRule.questionType}
            >
                <Select
                    size="small"
                    options={[{ label: "웹 개발", value: "WEB" },
                        { label: "모바일 앱 개발", value: "APP" },
                        { label: "데이터베이스와 데이터 관리", value: "DATA" },
                        { label: "보안", value: "SECURITY" },
                        { label: "개발 프로세스와 도구", value: "TOOL" },
                        { label: "채용과 경력", value: "CAREER" },
                        { label: "기타", value: "ETC" }]}
                    placeholder="질문 유형"
                />
            </S.QuestionType>
            <S.Library
                name="library"
                required={true}
                rules={requiredRule.library}
            >
                <S.LibraryInput
                    size="small"
                    placeholder="라이브러리를 입력해주세요."
                />
            </S.Library>
        </S.SelectBox>

        <S.ListContainer>
        <List
          itemLayout="vertical"
          size={"large"}
          loading={isLoading}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <S.Title>{item.title}</S.Title>
              <S.CreationTime>
                {item.createdAt.toLocaleString()}
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
                  text={`[질문]\n${item.title}\n\n[답변]\n${item.answer}`}
                  onCopy={() => {
                    setIsLoading(true);
                    messageApi.open({
                      type: "success",
                      content: "클립보드에 복사되었습니다.",
                    });
                    setIsLoading(false);
                  }}
                >
                  <Button
                    icon={<IoIosCopy />}
                    loading={isLoading}
                  >
                    복사
                  </Button>
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
          )}
        />
      </S.ListContainer>
      <Tooltip placement="left" title="클릭 시 검색 데이터가 초기화됩니다.">
        <FloatButton
          type="primary"
          icon={<TbZoomReset />}
          onClick={resetSearchData}
        />
      </Tooltip>
      <MyQuestionModalComponent questionData={modalData} />
    </S.Content>
  );
};
