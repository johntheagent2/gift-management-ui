import React from "react";
import { Dropdown, Avatar, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../css/header/header.css";
import { Header } from "antd/es/layout/layout";
import { logout, selectAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../css/common/button.css";
import { useNavigate } from "react-router-dom";

const CommonHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Setting",
    },
    {
      key: "3",
      label: "Logout",
    },
  ];

  const handleLogout = (e) => {
    if (e.key == "3") {
      dispatch(logout());
      navigate("/login");
    }
  };

  const menu = (
    <Menu onClick={handleLogout}>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <a href={item.href} target={item.target} rel={item.rel}>
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header className="header">
      <div className="header-content">
        <span className="companyname-header">Sparkminds</span>
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className="user-section">
            <span className="username-header">Anonymous</span>
            <Avatar icon={<UserOutlined />} className="user-picture" />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CommonHeader;
