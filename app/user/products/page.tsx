import Error from "@/app/error";
import AllProducts from "@/components/manage/AllProducts";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "All Products",
};

const getProducts = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/user/products`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function UserProductsPage() {
  const data = await getProducts();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllProducts data={data} />;
}
