import React from "react";
import { Col, Row } from "antd";
import SideMenu from "../../components/SideMenu";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={5}>
            <SideMenu />
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
