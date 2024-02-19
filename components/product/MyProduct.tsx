"use client";
import { IPurchases } from "@/backend/models/purchases";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  data: {
    booking: IPurchases;
  };
}

const MyProduct = ({ data }: Props) => {
  const pathname = usePathname();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [activeMenuItem, setActiveMenuItem] = useState<string>(pathname);

  const displayFile = (url: string) => {
    setFileUrl(url);
  };
  const productName = data?.booking?.product?.name;
  const pdfs = data?.booking?.product?.files;
  const category = data?.booking?.product?.category;
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          borderRight: "2px solid black",
        }}
      >
        {pdfs?.map((pdf) => (
          <button
            key={pdf.url}
            className={`fw-bold list-group-item list-group-item-action ${
              activeMenuItem === pdf.url ? "active" : ""
            }`}
            style={{
              marginTop: "10px",
              padding: "20px",
              width: "90%",
              borderBottom: "1px solid black",
              background: activeMenuItem === pdf.url ? "#e0e0e0" : "none",
              cursor: "pointer",
            }}
            onClick={() => {
              displayFile(pdf.url);
              setActiveMenuItem(pdf.url); // Activate the clicked button
            }}
            aria-current={activeMenuItem === pdf.url ? "true" : "false"}
          >
            {category === "Course" ? <p>{pdf.name}</p> : <p>{productName}</p>}
          </button>
        ))}
      </div>
      <iframe
        title="PDF Viewer"
        style={{ width: "100%", height: "700px" }}
        src={fileUrl}
      />
    </div>
  );
};

export default MyProduct;
