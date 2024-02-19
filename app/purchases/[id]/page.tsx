import Error from "@/app/error";
import PurchaseDetails from "@/components/booking/PurchaseDetails";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "My Purchase Details",
};

const getPurchase = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/purchases/${id}`,
    authHeader
  );
  return res.json();
};

export default async function MyPurchasesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPurchase(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <PurchaseDetails data={data} />;
}
