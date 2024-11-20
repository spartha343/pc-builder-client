import FeaturedProductCard from "@/components/FeaturedProductCard";
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import MainLayout from "@/layouts/MainLayout";
import { GetStaticProps } from "next";
import { ReactElement } from "react";

const CategoryPage = ({ products }: { products: IProduct[] }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Featured category Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <FeaturedProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;

CategoryPage.getLayout = function getLayout(
  page: ReactElement,
  { categories }: { categories: ICategory[] }
) {
  return <MainLayout categories={categories}>{page}</MainLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://pc-builder-server-fawn.vercel.app/categories"
  );
  const categories: ICategory[] = await res.json();

  const paths = categories.map((category) => ({
    params: { categoryName: category.categoryName }
  }));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<{
  categories: ICategory[];
  products: IProduct[];
}> = async ({ params }) => {
  const categoryName = params?.categoryName;
  const res = await fetch(
    "https://pc-builder-server-fawn.vercel.app/categories"
  );
  const categories = await res.json();
  const productsRes = await fetch(
    `https://pc-builder-server-fawn.vercel.app/products-by-category-name/${categoryName}`
  );
  const products = await productsRes.json();
  return { props: { categories, products } };
};
