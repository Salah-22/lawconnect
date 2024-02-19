import { IImage } from "@/backend/models/product";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";

interface Props {
  images: IImage[];
}

const ProductImageSlider = ({ images }: Props) => {
  return (
    <div style={{ width: "30%" }}>
      <Carousel>
        {images?.length > 0 ? (
          images?.map((image) => (
            <Carousel.Item key={image?.public_id}>
              <div style={{ maxWidth: "600px", margin: "auto" }}>
                <Image
                  className="d-block w-100"
                  src={image?.url}
                  alt={image?.url}
                  width={800}
                  height={460}
                />
              </div>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <div style={{ maxWidth: "600px", margin: "auto" }}>
              <Image
                className="d-block w-100"
                src={"/images/default_product_image.png"}
                alt={"/images/default_product_image.png"}
                width={800}
                height={460}
              />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default ProductImageSlider;
