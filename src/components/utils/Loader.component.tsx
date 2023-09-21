import React, { useEffect } from "react";
import { Space, Spin } from "antd";
import { useGlobalStore } from "../../stores/global.store";

const LoaderComponent = () => {
  const { setSpin } = useGlobalStore();

  useEffect(() => {
    setSpin(true);
  }, []);

  return (
    <div
      style={{
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    ></div>
  );
};

export default LoaderComponent;
