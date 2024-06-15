import AllProducts from "@/components/product/AllProducts";
import Error from "../error";

export const metadata = {
  title: "All Books",
};

const getPProducts = async (searchParams: string) => {
  try {
    const urlParams = new URLSearchParams(searchParams);
    const queryString = urlParams.toString();

    const res = await fetch(
      `${process.env.API_URL}/api/products?${queryString}`,
      {
        cache: "no-cache",
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error => ", error);
  }
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getPProducts(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllProducts data={data} />;
}
