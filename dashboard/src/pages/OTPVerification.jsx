import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const OTPVerification = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    setLoadings(true);
    const data = await axios.post(
      "http://localhost:8000/v1/api/auth/matchOTP",
      {
        email: params.email,
        otp: values.otp,
      },
      {
        headers: {
          Authorization: "CAt7p0qqwYALAIY",
        },
      }
    );
    setLoadings(false);
    setMsg("OTP Matched");
    setMsgType("success");
    setTimeout(() => {
      navigate("/");
    }, 1500);

    if (data.data.error) {
      setMsg(data.data.error);
      setMsgType("error");
    }

    console.log(data);
  };
  const onFinishFailed = (errorInfo) => {
    setLoadings(false);
    setMsg(errorInfo);
    setMsgType("error");
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
            label="OTP"
            name="otp"
            rules={[
              {
                required: true,
                message: "Please enter your OTP!",
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

export default OTPVerification;
