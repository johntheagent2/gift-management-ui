import React from "react";
import DashboardField from "./components/DashboardField";
import CommonHeader from "../common/CommonHeader";
import { Route, Routes } from "react-router-dom";
import CommonSider from "../common/CommonSider";
import { Layout } from "antd";
import Admin from "./components/Admin";
import { CommonFooter } from "../common/CommonFooter";

const Dashboard = () => {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <CommonHeader />
        <Layout>
          <CommonSider style={{ minHeight: "100vh" }} />
          <Content>
            <Routes>
              <Route path="/" element={<DashboardField />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<Admin />} />
              <Route path="/project" element={<Admin />} />
            </Routes>
          </Content>
        </Layout>
        <CommonFooter />
      </Layout>
    </div>
  );
};

export default Dashboard;
