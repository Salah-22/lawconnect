import Error from "@/app/error";
import MyProduct from "@/components/product/MyProduct";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "My products",
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/purchases/${id}`,
    authHeader
  );
  return res.json();
};

export default async function MyBookingsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBooking(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <MyProduct data={data} />;
}
