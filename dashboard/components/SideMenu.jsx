import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  GiftOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Users", "sub1", <UserOutlined />, [
      getItem("Add User", "adduser"),
      getItem("View User", "viewuser"),
    ]),
    getItem("Products", "sub2", <AppstoreOutlined />, [
      getItem("Add Product", "addproduct"),
      getItem("View Product", "viewproduct"),
    ]),
    getItem("Category", "sub4", <ApartmentOutlined />, [
      getItem("Add Category", "addcategory"),
      getItem("View Category", "viewcategory"),
      getItem("Add Sub-Category", "addsubcategory"),
      getItem("View Sub-Category", "viewsubcategory"),
    ]),
    getItem("Discounts", "sub5", <GiftOutlined />, [
      getItem("Add Discount", "adddiscount"),
      getItem("View Discount", "viewdiscount"),
    ]),
    getItem(
      "",
      "sub6",
      null,
      [getItem("Settings", "setting"), getItem("Logout", "")],
      "group"
    ),
  ];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SideMenu;
