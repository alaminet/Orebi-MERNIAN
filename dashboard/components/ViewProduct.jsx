import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import {
  CheckSquareTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  CloseSquareTwoTone,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ViewProduct = () => {
  const [editForm] = Form.useForm();
  const [catList, setCatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discription, setDiscription] = useState("");

  // console.log(catList);
  // Status Update
  const handleStatus = async (values) => {
    // console.log(values.action._id, values.action.status);
    try {
      const catStatus = await axios.post(
        "http://localhost:8000/v1/api/product/productstatus",
        {
          id: values.action._id,
          status: values.action.status,
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      // console.log(catStatus);
      message.success(catStatus.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  // Category Delete
  const handleDelete = async (values) => {
    // console.log(values.action._id);
    try {
      const catStatus = await axios.delete(
        `http://localhost:8000/v1/api/product/productdelete/${values.action._id}`,
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      // console.log(catStatus);
      message.warning(catStatus.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  // Category Edit
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setDiscription(values.action.discription);
    editForm.setFieldsValue({
      id: values.action._id,
      title: values.action.title,
    });
  };
  const onFinish = async (values) => {
    setIsModalOpen(false);
    const checkID = catList?.find((f) => f.action._id == values.id);
    if (checkID.action.title == values.title) {
      if (checkID.action.discription == discription) {
        message.warning("Product in not updated");
      } else {
        try {
          const update = await axios.post(
            "http://localhost:8000/v1/api/product/editproduct",
            {
              id: values.id,
              filed: "discription",
              value: discription,
            },
            {
              headers: {
                Authorization: "CAt7p0qqwYALAIY",
              },
            }
          );
          // console.log(catStatus);
          message.success(update.data.message);
        } catch (error) {
          message.error(error.response.data.message);
          // console.log(error.response.data.message);
        }
      }
    } else {
      try {
        const update = await axios.post(
          "http://localhost:8000/v1/api/product/editproduct",
          {
            id: values.id,
            filed: "title",
            value: values.title,
          },
          {
            headers: {
              Authorization: "CAt7p0qqwYALAIY",
            },
          }
        );
        // console.log(catStatus);
        message.success(update.data.message);
      } catch (error) {
        message.error(error.response.data.message);
        // console.log(error.response.data.message);
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Table Details
  const columns = [
    {
      title: "SL",
      dataIndex: "dataIndex",
      key: "dataIndex",
    },
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
          dangerouslySetInnerHTML={{
            __html:
              record.discriptions !== ""
                ? record.discriptions
                : record.ckdiscription,
          }}
        ></div>
      ),
    },
    {
      title: "Product Types",
      dataIndex: "proType",
      key: "proType",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <img src={record.image} width={30} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Flex gap={4}>
            <Tooltip title="Status">
              <Button
                onClick={() => handleStatus(record)}
                icon={
                  record.action.status == "waiting" ? (
                    <CheckSquareTwoTone />
                  ) : (
                    <CloseSquareTwoTone twoToneColor="#eb2f96" />
                  )
                }
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                onClick={() => handleEdit(record)}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                onClick={() => handleDelete(record)}
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
              />
            </Tooltip>
          </Flex>
        </>
      ),
    },
  ];

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
        // console.log(item.image);

        let newDiscription = "";
        // console.log(item.discription);
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
            newDiscription = item?.discription?.replace(
              oembedRegex,
              iframeElement
            );
          }
          if (oembedUrl.match("watch")) {
            const iframeElement = `<iframe width="315" height="200" src="https://www.youtube.com/embed/${
              oembedUrl.split("?v=")[1].split("&")[0]
            }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            newDiscription = item?.discription?.replace(
              oembedRegex,
              iframeElement
            );
          }
          // console.log(oembedUrl.split("?v=")[1].split("&amp;")[0]);
        }
        prdListArr.push({
          dataIndex: ++i,
          title: item?.title,
          ckdiscription: item?.discription,
          proType: item?.proType,
          discriptions: newDiscription,
          image: `http://localhost:5000${item?.image[0].imagePath}`,
          status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
          action: item,
        });
      });
      setCatList(prdListArr);
    }
    allCat();
  }, [handleStatus]);
  return (
    <>
      <div>
        <Table columns={columns} dataSource={catList} />
      </div>
      <div>
        <Modal
          title="Edit Product"
          open={isModalOpen}
          onCancel={handleCancel}
          footer=""
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="id"></Form.Item>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Product Title" />
            </Form.Item>
            <Form.Item
              label="Product Discription"
              name="discription"
              rules={[
                {
                  required: true,
                  message: "Discription rquired",
                },
              ]}
            >
              <CKEditor
                editor={ClassicEditor}
                data={discription}
                // onReady={(editor) => {
                //   // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor);
                // }}
                onChange={(event, editor) => {
                  setDiscription(editor.getData());
                }}
                // onBlur={(event, editor) => {
                //   console.log("Blur.", editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log("Focus.", editor);
                // }}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ViewProduct;
