import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import MainLayout from "@/layouts/MainLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ProductDetailsPage = ({ product }: { product: IProduct }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right side: Product Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{product.category}</p>

          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-800">
              {product.price}
            </span>
            <span
              className={`ml-4 px-3 py-1 text-sm font-semibold rounded-full ${
                product.status === "In Stock"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {product.status}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="space-y-2">
            {Object.entries(product.keyFeatures).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
            {product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              product.reviews.map((review, index) => (
                <div key={index} className="border-t pt-4">
                  <p className="font-semibold">{review.user}</p>
                  <div className="flex items-center text-yellow-400">
                    {"★".repeat(Math.round(review.rating))}{" "}
                    <span className="ml-2 text-gray-500">
                      ({review.rating})
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

ProductDetailsPage.getLayout = function getLayout(
  page: ReactElement,
  { categories }: { categories: ICategory[] }
) {
  return <MainLayout categories={categories}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps<{
  categories: ICategory[];
}> = async ({ params }) => {
  const id = params?.productDetailsById;
  const res = await fetch(
    "https://pc-builder-server-fawn.vercel.app/categories"
  );
  const categories = await res.json();

  const productRes = await fetch(
    `https://pc-builder-server-fawn.vercel.app/products/${id}`
  );
  const product = await productRes.json();
  return { props: { categories, product } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: IProduct[] = await (
    await fetch("https://pc-builder-server-fawn.vercel.app/products")
  ).json();

  const paths = products.map((product: { _id: string }) => ({
    params: { productDetailsById: product._id }
  }));

  return {
    paths,
    fallback: true // Allow fallback (show loading state while waiting for a product to be fetched)
  };
};
