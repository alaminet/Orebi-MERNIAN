import React, { useState } from "react";
import { Flex, Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUpload from "./ImageUpload";

const AddProduct = () => {
  const [productform] = Form.useForm();
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [discription, setDiscription] = useState("");
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/product/addproduct",
        {
          title: values.title,
          discription: discription,
          prductImg: fileList[0]?.originFileObj,
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
        productform.resetFields();
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
      <div style={{ width: "90%" }}>
        <Flex
          gap="middle"
          vertical
          align="center"
          justify="center"
          style={{ marginTop: "20px" }}
        >
          <div>
            <Form
              form={productform}
              name="products"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Product Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Category Name: ",
                  },
                ]}
              >
                <Input />
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
                  data=""
                  onChange={(event, editor) => {
                    setDiscription(editor.getData());
                  }}
                />
              </Form.Item>
              <Form.Item label="Product Image">
                <ImageUpload fileList={fileList} setFileList={setFileList} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 20,
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

export default AddProduct;
