import { ModalComponent } from "../utils/Modal.component";
import React from "react";
import { IProp } from "../../interfaces/prop.interface";
import { useGlobalStore } from "../../stores/global.store";

export const MyQuestionModalComponent = ({ questionData }: IProp) => {
  const { userInfo } = useGlobalStore();

  return (
    <ModalComponent
      modalTitle={`${questionData?.topic} / ${questionData?.type}`}
    >
      <div
        style={{
          padding: 20,
          height: 500,
          overflow: "auto",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", color: "gray", fontSize: 13 }}>
          {new Date(questionData?.createdAt!).toLocaleString()}
        </div>
        <hr
          style={{
            borderTop: "1px",
            borderColor: "#D8D9DA",
            margin: "10px 0 10px 0",
          }}
        />
        <div style={{ marginBottom: 30 }}>
          <p style={{ color: "black" }}>
            {userInfo?.name}
            <span style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
              {new Date(questionData?.createdAt!).toLocaleTimeString()}
            </span>
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
            {questionData?.query}
          </span>
        </div>
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "white",
            color: "black",
            padding: "10px 25px 20px 25px",
            width: "70%",
            marginBottom: 30,
            display: "inline-block",
            lineHeight: 1.5,
            fontSize: 15,
            boxShadow: "0 5px 10px #F1F0E8",
          }}
        >
          <p>{questionData?.answer}</p>
        </div>
      </div>
    </ModalComponent>
  );
};
