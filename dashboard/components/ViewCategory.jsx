import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewCategory = () => {
  const [catList, setCatList] = useState([]);

  // Collect All Category
  useEffect(() => {
    async function allCat() {
      const catList = await axios.get(
        "http://localhost:8000/v1/api/product/catlist",
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      let allCatList = [];
      catList?.data.map((item, i) => {
        allCatList.push({
          dataIndex: i,
          name: item.name,
          status: item.status,
          action: "Need to functional",
        });
      });
      setCatList(allCatList);
    }
    allCat();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={catList} />
    </div>
  );
};

export default ViewCategory;
