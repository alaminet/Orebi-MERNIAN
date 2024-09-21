import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Form,
  Input,
  Alert,
  Cascader,
  Select,
  InputNumber,
} from "antd";
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
  const [slugVal, setSlugVal] = useState("");
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleTitleChange = (e) => {
    let titleVal = e.target.value;
    setSlugVal(titleVal.split(" ").join("-").toLowerCase());
  };
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // title, discription, slug, categoryId, subCategoryId

    let imgArr = [];
    fileList.map((item) => {
      imgArr.push({ imagePath: item.response });
    });

    try {
      setLoadings(true);
      const data = await axios.post(
        "http://localhost:8000/v1/api/product/addproduct",
        {
          title: values.title,
          discription: discription,
          slug: slugVal,
          proType: values.proType,
          salePrice: values.salePrice,
          regularPrice: values.regularPrice,
          costPrice: values.costPrice,
          quantity: values.quantity,
          categoryId: values.Cat,
          subCategoryId: values.subCat,
          // uploadImages: fileList[0].originFileObj,
          images: [...imgArr],
        },
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
            // "Content-Type": "multipart/form-data",
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

  // CaseCade Category
  // Collect All Category
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
    catList?.data.map((item, i) => {
      if (item.status === "approve") {
        allCatList.push({
          value: item._id,
          label: item.name,
        });
      }
    });
    setCatList(allCatList);
  }

  useEffect(() => {
    allCat();
  }, []);

  const onChangeCat = async (value) => {
    try {
      const SubList = await axios.post(
        `http://localhost:8000/v1/api/product/catcascader/${value}`,
        {
          headers: {
            Authorization: "CAt7p0qqwYALAIY",
          },
        }
      );

      let allSubCatList = [];
      SubList?.data.map((item, i) => {
        allSubCatList.push({
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          value: item._id,
        });
      });
      setSubCatList(allSubCatList);
    } catch (error) {
      console.log(error);
    }
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
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                onChange={handleTitleChange}
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
              <Form.Item label="Slug" name="slug">
                <Input disabled placeholder={slugVal} />
              </Form.Item>

              <Form.Item label="Category">
                <Form.Item
                  name="Cat"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Select
                    showSearch
                    placeholder="Select a Category"
                    optionFilterProp="label"
                    onChange={onChangeCat}
                    options={catList}
                  />
                </Form.Item>
                <Form.Item
                  name="subCat"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Select
                    showSearch
                    placeholder="Select Sub-Category"
                    optionFilterProp="label"
                    options={subCatList}
                  />
                </Form.Item>
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
              <Form.Item label="Product Image" name="images">
                {/* <input type="file" multiple /> */}
                <ImageUpload
                  fileList={fileList}
                  setFileList={setFileList}
                  fileAccept={5}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Form.Item
                  label="Sale"
                  name="salePrice"
                  style={{ display: "inline-block", width: "calc(33% - 8px)" }}
                >
                  <InputNumber placeholder="Sale Price" />
                </Form.Item>
                <Form.Item
                  label="Regular"
                  name="regularPrice"
                  style={{ display: "inline-block", width: "calc(33% - 8px)" }}
                >
                  <InputNumber placeholder="Regular Price" />
                </Form.Item>
                <Form.Item
                  label="Cost"
                  name="costPrice"
                  style={{ display: "inline-block", width: "calc(33% - 8px)" }}
                >
                  <InputNumber placeholder="Cost Price" />
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  style={{ display: "inline-block", width: "calc(33% - 8px)" }}
                >
                  <InputNumber placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                  label="Product Type"
                  name="proType"
                  style={{ display: "inline-block", width: "calc(65% - 8px)" }}
                >
                  <Select
                    showSearch
                    placeholder="Select Sub-Category"
                    optionFilterProp="label"
                    options={[
                      {
                        label: "Default",
                        value: "default",
                      },
                      {
                        label: "Top",
                        value: "top",
                      },
                      {
                        label: "New",
                        value: "new",
                      },
                      {
                        label: "Featured",
                        value: "featured",
                      },
                      {
                        label: "Flash",
                        value: "flash",
                      },
                    ]}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 5,
                  span: 19,
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
