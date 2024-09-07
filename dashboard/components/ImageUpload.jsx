import React from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

// const getSrcFromFile = (file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file.originFileObj);
//     reader.onload = () => resolve(reader.result);
//   });
// };

const ImageUpload = ({ fileList, setFileList, fileAccept }) => {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop showGrid rotationSlider aspectSlider showReset>
      <Upload
        name="imgUp"
        action="http://localhost:5000/"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < fileAccept && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
