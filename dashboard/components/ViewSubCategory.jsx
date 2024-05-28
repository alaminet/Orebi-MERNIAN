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

const ViewSubCategory = () => {
  const [editForm] = Form.useForm();
  const [catList, setCatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status Update
  const handleStatus = async (values) => {
    // console.log(values);
    try {
      const subCatStatus = await axios.post(
        "http://localhost:8000/v1/api/product/subcategorystatus",
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
      message.success(subCatStatus.data.message);
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
        `http://localhost:8000/v1/api/product/subcategorydelete/${values.action._id}`,
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
    editForm.setFieldsValue({
      id: values.action._id,
      name: values.action.name,
    });
  };
  const onFinish = async (values) => {
    // console.log(values);
    setIsModalOpen(false);
    try {
      const catStatus = await axios.post(
        "http://localhost:8000/v1/api/product/editsubcategory",
        {
          id: values.id,
          name: values.name,
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Table Arrangement
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
          action: item,
        });
      });
      setCatList(allSubCatList);
    }
    allSubCat();
  }, [handleStatus]);
  return (
    <>
      <div>
        <Table columns={columns} dataSource={catList} />
      </div>
      <div>
        <Modal
          title="Edit Sub-Category"
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
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Category Name" />
            </Form.Item>
            <Form.Item name="id"></Form.Item>
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

export default ViewSubCategory;
