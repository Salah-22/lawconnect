import Error from "@/app/error";
import MyPurchases from "@/components/booking/MyPurchases";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "My Purchases",
};

const getBookings = async () => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/purchases/me`,
    authHeader
  );
  return res.json();
};

export default async function MyPurchasesPage() {
  const data = await getBookings();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <MyPurchases data={data} />;
}
