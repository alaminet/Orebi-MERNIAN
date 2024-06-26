import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Loginuser } from "../Slice/UserSlice";

const Login = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log("Success:", values);

    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      setLoadings(false);
      setMsg("Successfull logged in");
      setMsgType("success");
      dispatch(Loginuser(data.data));
      localStorage.setItem("user", JSON.stringify(data.data));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setLoadings(false);
      setMsg(error.response.data.error);
      setMsgType("error");
      if (error.response.data.error === "Please Verify your OTP") {
        setTimeout(() => {
          navigate(`/otpverification/${values.email}`);
        }, 1500);
      }
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
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginBottom: "0px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings}
              disabled={loadings}
            >
              Login
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              htmlType="button"
              onClick={() => navigate("/registration")}
            >
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <NavLink to={"/forgotpassord"}>Forgot your password?</NavLink>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
