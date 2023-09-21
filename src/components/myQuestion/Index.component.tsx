import React, { useEffect, useState } from "react";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Layout,
  List,
  message,
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

const { Content } = Layout;
const { Search } = Input;

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

  /* Component */
  return (
    <Content style={{ padding: "10px 15% 0 15%" }}>
      {contextHolder}
      <Form form={form} onFinish={submit}>
        <Form.Item name="searchData" required={true} rules={formRules}>
          <Input
            size={"large"}
            placeholder={"검색할 이전 프롬포트를 입력해주세요."}
            style={{ borderRadius: 20, paddingLeft: 20, marginRight: 10 }}
            disabled={isLoading}
            suffix={
              <AiOutlineSearch
                onClick={() => form.submit()}
                style={{ cursor: "pointer" }}
              />
            }
          />
        </Form.Item>
      </Form>

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
          loading={isLoading}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div style={{ fontSize: 20 }}>{item.title}</div>
              <span style={{ fontSize: 14, color: "gray" }}>
                {item.createdAt.toLocaleString()}
              </span>
              <div style={{ marginTop: 15 }}>{item.answer}</div>
              <div style={{ marginTop: 20 }}>
                <Button
                  icon={<IoIosShareAlt />}
                  style={{ marginRight: 10 }}
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
                    style={{ marginRight: 10 }}
                    loading={isLoading}
                  >
                    복사
                  </Button>
                </CopyToClipboard>
                <Button
                  icon={<IoDocumentText />}
                  style={{ marginRight: 10 }}
                  loading={isLoading}
                  onClick={() => showModal(item)}
                >
                  자세히 보기
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Tooltip placement="left" title="클릭 시 검색 데이터가 초기화됩니다.">
        <FloatButton
          type="primary"
          icon={<TbZoomReset />}
          onClick={resetSearchData}
        />
      </Tooltip>
      <MyQuestionModalComponent questionData={modalData} />
    </Content>
  );
};
