import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const LinkVerification = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/auth/matchEmail",
        {
          email: values.email,
          token: params.token,
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      setLoadings(false);
      setMsg("Email Matched");
      setMsgType("success");
      //   setTimeout(() => {
      //     navigate("/login");
      //   }, 1500);
    } catch (error) {
      setLoadings(false);
      setMsg("Invalid email, Please try again");
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
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
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
    </>
  );
};

export default LinkVerification;
