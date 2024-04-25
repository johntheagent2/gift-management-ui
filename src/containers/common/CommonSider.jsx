import React from "react";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CommonSider = () => {
  const { SubMenu } = Menu;
  const navigate = useNavigate();

  const handleSelect = (e) => {
    switch (e.key) {
      case "overall":
        navigate("");
        break;
      case "admin":
        navigate("admin");
        break;
      case "user":
        navigate("user");
        break;
      case "project":
        navigate("project");
        break;
      default:
        break;
    }
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        onSelect={handleSelect}
      >
        <SubMenu key="management" icon={<LaptopOutlined />} title="Management">
          <Menu.Item key="overall">Overall</Menu.Item>
          <Menu.Item key="admin">Admin</Menu.Item>
          <Menu.Item key="user">User</Menu.Item>
          <Menu.Item key="project">Project</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default CommonSider;
