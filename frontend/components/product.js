import React from "react";
import ProductCard from "./productCard";

async function getData() {
  const res = await fetch("http://localhost:8000/v1/api/product/viewproduct", {
    headers: {
      Authorization: "CAt7p0qqwYALAIY",
    },
  });
  return res.json();
}

const Product = async () => {
  const data = await getData();

  return (
    <>
      <div style={{ display: "flex", gap: "14px" }}>
        {data?.map((item, i) => (
          <ProductCard key={i} data={item} />
        ))}
      </div>
    </>
  );
};

export default Product;
