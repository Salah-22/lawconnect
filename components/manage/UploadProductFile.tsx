"use client";
import { IFile, IProduct } from "@/backend/models/product";
import { revalidateTag } from "@/helpers/revalidate";
import {
  useDeleteProductFileMutation,
  useUploadProductFilesMutation,
} from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

interface Props {
  data: {
    product: IProduct;
  };
}

const UploadProductFile = ({ data }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [filesPreview, setFilesPreview] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  const category = data?.product?.category;

  useEffect(() => {
    if (data) {
      setUploadedFiles(data?.product?.files);
    }
  }, [data]);

  const router = useRouter();

  const [uploadProductFiles, { error, isLoading, isSuccess }] =
    useUploadProductFilesMutation();

  const [
    deleteProductFile,
    {
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteProductFileMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("ProductDetails");
      setFilesPreview([]);
      router.refresh();
      toast.success("Files Uploaded");
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (deleteError && "data" in deleteError) {
      toast.error(deleteError?.data?.errMessage);
    }

    if (isDeleteSuccess) {
      revalidateTag("ProductDetails");
      router.refresh();
      toast.success("File Deleted");
    }
  }, [deleteError, isDeleteSuccess]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setFiles([]);
    setFilesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles((oldArray) => [...oldArray, reader.result as string]);
          setFilesPreview((oldArray) => [...oldArray, reader.result as string]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = () => {
    uploadProductFiles({ id: data?.product?._id, body: { files, name } });
  };

  const removeFilePreview = (imgUrl: string) => {
    const filteredFilesPreview = filesPreview.filter((img) => img != imgUrl);

    setFilesPreview(filteredFilesPreview);
    setFiles(filteredFilesPreview);
  };

  const handleFileDelete = (imgId: string) => {
    deleteProductFile({ id: data?.product?._id, body: { imgId } });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-7 mt-5 mt-lg-0">
        <form className="shadow rounded bg-body">
          <h2 className="mb-4">Upload Product Files</h2>

          <div className="form-group">
            {category === "Course" && (
              <>
                <label htmlFor="productName" className="form-label">
                  Enter Course Name
                </label>

                <div className="custom-file">
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    id="product_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </>
            )}

            <label htmlFor="customFile" className="form-label">
              Choose Pdf Files
            </label>

            <div className="custom-file">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                name="product_images"
                className="form-control"
                id="customFile"
                onChange={onChange}
                onClick={handleResetFileInput}
                multiple
                required
              />
            </div>

            {filesPreview?.length > 0 && (
              <div className="new-images mt-4">
                <p className="text-warning">New Files:</p>
                <div className="row mt-4">
                  {filesPreview?.map((img) => (
                    <div className="col-md-3 mt-2">
                      <div className="card">
                        <img
                          src="/images/pdf.png"
                          alt="File Preview"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "80px" }}
                        />
                        {category === "Books" && <p>{data?.product?.name}</p>}

                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          type="button"
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          onClick={() => removeFilePreview(img)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedFiles?.length > 0 && (
              <div className="uploaded-images mt-4">
                <p className="text-success">Product Uploaded Files:</p>
                <div className="row mt-1">
                  {uploadedFiles?.map((img) => (
                    <div className="col-md-3 mt-2">
                      <div className="card">
                        <img
                          src="/images/pdf.png"
                          alt="/images/pdf.png"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "80px" }}
                        />
                        <p>{img.name}</p>
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          onClick={() => handleFileDelete(img.public_id)}
                          disabled={isDeleteLoading || isLoading}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn form-btn w-100 py-2"
            onClick={submitHandler}
            disabled={isLoading || isDeleteLoading}
          >
            {isLoading ? <ButtonLoader /> : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProductFile;
