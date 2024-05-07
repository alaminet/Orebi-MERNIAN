import React from "react";
import { Col, Row } from "antd";
import SideMenu from "../../components/SideMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((user) => user.loginSlice.login);
  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={5}>
            <SideMenu user={user} />
          </Col>
          <Col span={19}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
