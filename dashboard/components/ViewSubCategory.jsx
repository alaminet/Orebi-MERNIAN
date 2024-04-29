import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Sub-Category",
    dataIndex: "subcategory",
  },
  {
    title: "Category",
    dataIndex: "category",
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

const ViewSubCategory = () => {
  const [catList, setCatList] = useState([]);

  // Collect All Category
  useEffect(() => {
    async function allSubCat() {
      const subCatList = await axios.get(
        "http://localhost:8000/v1/api/product/subcatlist",
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      let allSubCatList = [];
      subCatList?.data.map((item, i) => {
        allSubCatList.push({
          dataIndex: i,
          subcategory: item.name,
          category: item.categoryID.name,
          status: item.status,
          action: "Need to functional",
        });
      });
      setCatList(allSubCatList);
    }
    allSubCat();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={catList} />
    </div>
  );
};

export default ViewSubCategory;
