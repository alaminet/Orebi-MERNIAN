import React from "react";
import ProductCard from "./productCard";
import { Container } from "react-bootstrap";

async function getData() {
  const res = await fetch(
    "http://localhost:8000/v1/api/product/viewproduct",
    {
      headers: {
        Authorization: "CAt7p0qqwYALAIY",
      },
    },
    { cache: "no-store" }
  );
  return res.json();
}
const Product = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <Container>
        <div style={{ display: "flex", gap: "14px" }}>
          {data?.map((item, i) => {
            if (item.status) {
              return <ProductCard key={i} data={item} />;
            }
          })}
        </div>
      </Container>
    </>
  );
};

export default Product;
