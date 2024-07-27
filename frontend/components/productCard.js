"use client";
import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const ProductCard = ({ data }) => {
  let newDiscription = "";
  // console.log(item.discription);
  // Use a regular expression to find the oembed element in the HTML string
  const oembedRegex = /<oembed[^>]*>/g;
  const oembedMatch = data?.discription?.match(oembedRegex);
  // If an oembed element was found, convert it to an iframe element
  if (oembedMatch) {
    const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
    if (oembedUrl.match(".be/")) {
      const iframeElement = `<iframe width="315" height="200" src="https://www.youtube.com/embed/${
        oembedUrl.split(".be/")[1]
      }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      newDiscription = data?.discription?.replace(oembedRegex, iframeElement);
    }
    if (oembedUrl.match("watch")) {
      const iframeElement = `<iframe width="315" height="200" src="https://www.youtube.com/embed/${
        oembedUrl.split("?v=")[1].split("&")[0]
      }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      newDiscription = data?.discription?.replace(oembedRegex, iframeElement);
    }
    // console.log(oembedUrl.split("?v=")[1].split("&amp;")[0]);
  }

  return (
    <>
      <Col xs={3}>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              alt="cardImage"
              src={`http://localhost:8000${data?.image}`}
              width={200}
              height={200}
              //   loading="lazy"
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <Card.Body>
            <Card.Title>{data?.title}</Card.Title>
            <div dangerouslySetInnerHTML={{ __html: newDiscription }}></div>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default ProductCard;
