type topic =
  | "Java"
  | "Javascript"
  | "Kotlin"
  | "React"
  | "Next.js"
  | "Node.js"
  | "Nest.js"
  | "Spring";

type questionType =
  | "웹 개발"
  | "모바일 앱 개발"
  | "데이터베이스와 데이터 관리"
  | "보안"
  | "개발 프로세스와 도구"
  | "채용과 경력"
  | "기타";

export interface IWhipGPTData {
  title: string;
  topic: topic;
  library: string;
  questionType: questionType;
}
