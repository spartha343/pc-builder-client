import MainLayout from "@/layouts/MainLayout";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { GetStaticProps } from "next";
import { ICategory } from "@/interfaces/category.interface";
import HomePageHeroSection from "@/components/HomePageHeroSection";
import { IProduct } from "@/interfaces/product.interface";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import Link from "next/link";

const HomePage: NextPageWithLayout<{
  categories: ICategory[];
  featuredProducts: IProduct[];
}> = ({ featuredProducts, categories }) => {
  return (
    <>
      <HomePageHeroSection />

      {/* Featured Products Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <div
              key={category._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {category.categoryName}
              </h3>
              <div className="mt-4">
                <Link href={`/categories/${category.categoryName}`}>
                  <p className="text-blue-600 hover:text-blue-800">
                    View Products
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(
  page: ReactElement,
  { categories }: { categories: ICategory[] }
) {
  return <MainLayout categories={categories}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps<{
  categories: ICategory[];
}> = async () => {
  const res = await fetch(
    "https://pc-builder-server-fawn.vercel.app/categories"
  );
  const categories = await res.json();

  const featuredProductsRes = await fetch(
    "https://pc-builder-server-fawn.vercel.app/featured-products"
  );
  const featuredProducts = await featuredProductsRes.json();
  return { props: { categories, featuredProducts } };
};
