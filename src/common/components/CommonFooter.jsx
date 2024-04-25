import React from "react";
import { Layout } from "antd";

export const CommonFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
