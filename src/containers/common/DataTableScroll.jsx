import React, { useState } from "react";
import { Table } from "antd";

const DataTableScroll = ({ columns, data, defaultPageSize }) => {
  // Manage pageSize in component state
  const [pageSize, setPageSize] = useState(defaultPageSize);

  return (
    <div className="first-dashboard">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onShowSizeChange: (current, newSize) => setPageSize(newSize), // Update pageSize when changed
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{
          y: 240,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default DataTableScroll;
