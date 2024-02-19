import Error from "@/app/error";
import AllSales from "@/components/manage/AllSales";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "All Sales ",
};

const getSales = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/user/sales`, authHeaders);
  return res.json();
};

export default async function UserSalesPage() {
  const data = await getSales();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllSales data={data} />;
}
