import ProductReviews from "@/components/manage/ProductReviews";
import { getAuthHeader } from "@/helpers/authHeader";
import Error from "@/app/error";

export const metadata = {
  title: "Product Reviews - Lawconnect",
};

const getProducts = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/user/products`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function UserProductReviewsPage() {
  const data = await getProducts();

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <ProductReviews datas={data} />;
}
