import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMock } from "../../../redux/slices/TestSlice";
import { Layout, Menu, Breadcrumb, Dropdown, MenuProps, Table } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { getEmail } from "../../../redux/slices/userSlice";
import CommonHeader from "../../common/CommonHeader";
import DataTableScroll from "../../common/DataTableScroll";
import axios from "axios";

const Admin = () => {
  const [userEmail, setUserEmail] = useState("null");
  const { Header, Content, Sider } = Layout;
  const [apiData, setApiData] = useState({});
  const dispatch = useDispatch();

  const apiCols = [
    {
      title: "USD",
      dataIndex: "usd",
      width: 150,
    },
    {
      title: "JPY",
      dataIndex: "jpy",
      width: 150,
    },
    {
      title: "EUR",
      dataIndex: "eur",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
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
        <div className="first-dashboard">
          <DataTableScroll columns={columns} data={data} pageSize={20} />
        </div>

        <div className="third-dashboard">
          <DataTableScroll columns={columns} data={data} pageSize={20} />
        </div>
      </Content>
    </Layout>
  );
};

export default Admin;
