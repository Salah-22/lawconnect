import Error from "@/app/error";
import ProductDetails from "@/components/product/ProductDetails";

interface Props {
  params: { id: string };
}

const getProduct = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    next: {
      tags: ["ProductDetails"],
    },
  });
  return res.json();
};

export default async function ProductDetailsPage({ params }: Props) {
  const data = await getProduct(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <ProductDetails data={data} />;
}

export async function generateMetadata({ params }: Props) {
  const data = await getProduct(params?.id);

  return {
    title: data?.product?.name,
  };
}
