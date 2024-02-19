import Error from "@/app/error";
import UpdateProduct from "@/components/manage/UpdateProduct";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Update Product ",
};

const getProduct = async (id: string) => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function AdminUpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProduct(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UpdateProduct data={data} />;
}
