import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMock } from "../../../redux/slices/TestSlice";
import { Layout, Menu, Breadcrumb, Dropdown, MenuProps, Table } from "antd";
import DataTableScroll from "../../common/DataTableScroll";
import socketClient from "./CryptoPriceTracker ";
const DashboardField = () => {
  const { Header, Content, Sider } = Layout;
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Link",
      dataIndex: "link",
      width: 150,
    },
    {
      title: "Created by",
      dataIndex: "created_by",
    },
    {
      title: "Created date",
      dataIndex: "created_date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      link: `link ${i}`,
      created_by: `Someone ${i}`,
      created_date: `1/1/2024`,
      status: `REQUESTED`,
    });
  }

  return (
    <Layout style={{ padding: "0 24px 24px", height: "100%" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="dashboard" style={{ height: "100%" }}>
          <DataTableScroll columns={columns} data={data} pageSize={20} />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardField;
