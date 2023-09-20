import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import GlobalStyles from "../GlobalStyles";
import { AntLayout, AntFooter } from "../components/common/AntLayout";
import { WhipGPT } from "../pages/WhipGPT";
import { MyQuestions } from "../pages/MyQuestions";
import { Study } from "../pages/Study";
import { Community } from "../pages/Community";
import { Login } from "../pages/Login";
import { Write } from "../pages/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <AntLayout />
        <Routes>
          <Route path="/" element={<WhipGPT />}></Route>
            <Route path="/login" element={<Login />}></Route>
          <Route path="/my/questions" element={<MyQuestions />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/study" element={<Study />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
        <AntFooter />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
