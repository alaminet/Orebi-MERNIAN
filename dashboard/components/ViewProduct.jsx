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
        // Use a regular expression to find the oembed element in the HTML string
        const oembedRegex = /<oembed[^>]*>/g;
        const oembedMatch = item?.discription?.match(oembedRegex);
        // If an oembed element was found, convert it to an iframe element
        if (oembedMatch) {
          const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
          if (oembedUrl.match(".be/")) {
            const iframeElement = `<iframe width="315" height="200" src="https://www.youtube.com/embed/${
              oembedUrl.split(".be/")[1]
            }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            item.discription = item?.discription?.replace(
              oembedRegex,
              iframeElement
            );
          }
          if (oembedUrl.match("watch")) {
            const iframeElement = `<iframe width="315" height="200" src="https://www.youtube.com/embed/${
              oembedUrl.split("?v=")[1].split("&")[0]
            }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            item.discription = item?.discription?.replace(
              oembedRegex,
              iframeElement
            );
          }
          // console.log(oembedUrl.split("?v=")[1].split("&amp;")[0]);
        }
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
