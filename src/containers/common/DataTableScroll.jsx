import React, { useState } from "react";
import { Table, Button, Empty, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";

const DataTableScroll = ({ columns, data, defaultPageSize }) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  const handleEdit = (record) => {
    setEditedRecord(record);
    setEditModalVisible(true);
  };

  const handleRemove = (record) => {
    console.log("Remove clicked for record:", record);
  };

  const handleLinkClick = (record) => {
    console.log("Clicked link for record:", record);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditedRecord(null);
  };

  const handleEditModalSubmit = (values) => {
    // Handle edit form submission here
    console.log("Edited values:", values);
    setEditModalVisible(false);
    setEditedRecord(null);
  };

  const customizeColumns = () => {
    const firstColumn = columns.slice(0, 1);
    const linkColumn = {
      ...columns[1],
      render: (record) => (
        <Button
          type="primary"
          icon={<LinkOutlined />}
          onClick={() => window.open(record.link, "_blank")}
        ></Button>
      ),
    };
    const remainingColumns = columns.slice(2);
    const actionsColumn = {
      dataIndex: "",
      key: "actions",
      align: "right",
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record)}
            danger
          ></Button>
        </>
      ),
    };
    const customColumns = [
      ...firstColumn,
      linkColumn,
      ...remainingColumns,
      actionsColumn,
    ];
    return customColumns;
  };

  return (
    <>
      <Table
        columns={customizeColumns()}
        dataSource={data}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onShowSizeChange: (current, newSize) => setPageSize(newSize),
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ y: 600 }}
        style={{ width: "100%" }}
        locale={{
          emptyText: <Empty description="No Data" />,
        }}
      />
      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <EditForm
          record={editedRecord}
          onCancel={handleEditModalCancel}
          onSubmit={handleEditModalSubmit}
        />
      </Modal>
    </>
  );
};

const EditForm = ({ record, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  return (
    <Form form={form} onFinish={handleFormSubmit} initialValues={record}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input />
      </Form.Item>
      {/* Add more form fields as needed */}
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      <Button onClick={onCancel} style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </Form>
  );
};

export default DataTableScroll;
