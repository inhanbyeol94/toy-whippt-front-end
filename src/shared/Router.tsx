import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout, Spin } from "antd";
import GlobalStyles from "../GlobalStyles";
import { AntLayout, AntFooter } from "../components/common/AntLayout";
import { WhipGPT } from "../pages/WhipGPT";
import { MyQuestions } from "../pages/MyQuestions";
import { Study } from "../pages/Study";
import { Community } from "../pages/Community";
import { Login } from "../pages/Login";
import { Write } from "../pages/Write";
import { PrivateRoute } from "./util/PrivateRoute";
import { GuestRoute } from "./util/GuestRoute";
import { useGlobalStore } from "../stores/global.store";
import { Transition } from "react-transition-group";

const Router = () => {
  const { header, spin } = useGlobalStore();

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        {header ? <AntLayout /> : null}
        <Spin
          size="large"
          spinning={spin}
          style={{
            position: "absolute",
            top: "25%",
          }}
        >
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<WhipGPT />}></Route>
              <Route path="/my/questions" element={<MyQuestions />}></Route>
              <Route path="/community" element={<Community />}></Route>
              <Route path="/study" element={<Study />}></Route>
              <Route path="/write" element={<Write />}></Route>
            </Route>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
          <AntFooter />
        </Spin>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
