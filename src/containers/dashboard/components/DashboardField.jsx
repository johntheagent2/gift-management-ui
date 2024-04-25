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
import socketClient from "./CryptoPriceTracker ";
const DashboardField = () => {
  const { Header, Content, Sider } = Layout;
  const dispatch = useDispatch();

  const cryptoCols = [
    {
      title: "Symbol ID",
      dataIndex: "symbol_id",
      key: "symbol_id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Taker Side",
      dataIndex: "taker_side",
      key: "taker_side",
    },
    {
      title: "Time (Exchange)",
      dataIndex: "time_exchange",
      key: "time_exchange",
    },
  ];
  const [btcPrice, setBtcPrice] = useState({ symbol_id: "BTC", ...cryptoCols });
  const [ethPrice, setEthPrice] = useState({ symbol_id: "ETH", ...cryptoCols });

  useEffect(() => {
    const socket = socketClient.subscribeToPriceUpdates();

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.symbol_id === "BITSTAMP_SPOT_BTC_USD") {
        setBtcPrice(formatCoinData(message));
      } else if (message.symbol_id === "BITSTAMP_SPOT_ETH_USD") {
        setEthPrice(formatCoinData(message));
      }
    };

    return () => {
      socketClient.unsubscribeFromPriceUpdates(socket);
    };
  }, []);

  const formatSymbolId = (symbolId) => {
    const symbol = symbolId.split("_")[2];
    return symbol;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });
    return formattedDate;
  };

  const formatCoinData = (message) => {
    message.symbol_id = formatSymbolId(message.symbol_id);
    message.time_exchange = formatDate(message.time_exchange);
    message.price = usdFormat(message.price);
    return message;
  };

  const usdFormat = (money) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(money);
  };

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
          <DataTableScroll
            columns={cryptoCols}
            data={[btcPrice, ethPrice]}
            pageSize={20}
          />
        </div>

        <div className="second-dashboard">
          <DataTableScroll columns={columns} data={data} pageSize={20} />
        </div>

        <div className="second-dashboard">
          <DataTableScroll columns={columns} data={data} pageSize={20} />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardField;
