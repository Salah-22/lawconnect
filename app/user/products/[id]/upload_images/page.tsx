import Error from "@/app/error";
import UploadProductImages from "@/components/manage/UploadProductImages";

export const metadata = {
  title: "Upload Product Images ",
};

const getProduct = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    next: {
      tags: ["ProductDetails"],
    },
  });
  return res.json();
};

export default async function AdminUploadImagesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UploadProductImages data={data} />;
}
