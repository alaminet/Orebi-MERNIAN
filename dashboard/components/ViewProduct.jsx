import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Discriptions",
    dataIndex: "discriptions",
    key: "discriptions",
    render: (_, record) => (
      <div
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: record.discriptions }}
      ></div>
    ),
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (_, record) => <img src={record.image} width={30} />,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewProduct = () => {
  const [catList, setCatList] = useState([]);

  // Collect All Category
  useEffect(() => {
    async function allCat() {
      const productList = await axios.get(
        "http://localhost:8000/v1/api/product/viewproduct",
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      let prdListArr = [];
      productList?.data.map((item, i) => {
        prdListArr.push({
          dataIndex: i,
          title: item.title,
          discriptions: item.discription,
          image: `http://localhost:8000${item.image}`,
          status: item.status,
          action: "Need to functional",
        });
      });
      setCatList(prdListArr);
    }
    allCat();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={catList} />
    </div>
  );
};

export default ViewProduct;
