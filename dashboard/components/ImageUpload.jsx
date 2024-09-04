import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const ImageUpload = ({ fileList, setFileList,fileAccept }) => {
  const onChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <ImgCrop showGrid rotationSlider aspectSlider showReset>
      <Upload
        name="avatar"
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
