import React, { useEffect, useState } from "react";
import { Flex, Button, Form, Input, Alert, Select } from "antd";
import axios from "axios";

const AddSubCategory = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [catList, setCatList] = useState([]);
  const [catSelect, setCatSelect] = useState("");

  const onChange = (value) => {
    setCatSelect(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/product/addsubcategory",
        {
          name: values.name,
          categoryID: values.catname,
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      setLoadings(false);
      setMsg(data.data.message);
      setMsgType("success");
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

  // Collect All Category
  useEffect(() => {
    async function allCat() {
      const catList = await axios.get(
        "http://localhost:8000/v1/api/product/catlist",
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );
      let allCatList = [];
      catList.data.map((item, i) => {
        allCatList.push({
          value: item._id,
          label: item.name,
        });
      });
      setCatList(allCatList);
    }
    allCat();
  }, []);
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
              name="basic"
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
                label="Sub-Category Name:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Sub-Category Name: ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category Name:"
                name="catname"
                rules={[
                  {
                    required: true,
                    message: "Category Name: ",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Category"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={catList}
                />
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

export default AddSubCategory;
