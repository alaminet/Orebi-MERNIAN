import React, { useState } from "react";
import { Flex, Button, Form, Input, Alert } from "antd";
import axios from "axios";
import ImageUpload from "./ImageUpload";

const AddCategory = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [catform] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    // console.log("Success:", values);

    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/product/addcategory",
        {
          name: values.name,
          catImg: fileList[0]?.originFileObj,
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadings(false);
      setMsg(data.data.message);
      setMsgType("success");
      setTimeout(() => {
        setMsg("");
        catform.resetFields();
        setFileList([]);
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoadings(false);
      setMsg(error.response.data.message);
      setMsgType("error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {msg && <Alert message={msg} type={msgType} showIcon closable />}
      <div>
        <Flex
          gap="middle"
          vertical
          align="center"
          justify="center"
          style={{ marginTop: "20px" }}
        >
          <div>
            <Form
              form={catform}
              name="categoryForm"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              initialValues={{
                remember: true,
              }}
              style={{ width: "600px" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Category Name:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Category Name: ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Category Image">
                <ImageUpload fileList={fileList} setFileList={setFileList} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 14,
                }}
                style={{ marginBottom: "0px" }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings}
                  disabled={loadings}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default AddCategory;
