import React from "react";
import ProductCard from "./productCard";

async function getData() {
  const res = await fetch(
    "http://localhost:8000/v1/api/product/viewproduct",
    {
      headers: {
        Authorization: "CAt7p0qqwYALAIY",
      },
    },
    { next: { revalidate: 1 } }
  );
  return res.json();
}
const Product = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <div style={{ display: "flex", gap: "14px" }}>
        {data?.map((item, i) => {
          if (item.status === "approve") {
            return <ProductCard key={i} data={item} />;
          }
        })}
      </div>
    </>
  );
};

export default Product;
