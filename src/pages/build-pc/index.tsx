/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/interfaces/category.interface";
import { IProduct } from "@/interfaces/product.interface";
import MainLayout from "@/layouts/MainLayout";
import { GetStaticProps } from "next";
import Image from "next/image";
import { ReactElement, useState } from "react";

export const getStaticProps: GetStaticProps<{
  categories: ICategory[];
}> = async () => {
  const res = await fetch(
    "https://pc-builder-server-fawn.vercel.app/categories"
  );
  const categories = await res.json();
  const productRes = await fetch(
    "https://pc-builder-server-fawn.vercel.app/products"
  );
  const products = await productRes.json();
  return { props: { categories, products } };
};

interface PCBuilderProps {
  categories: ICategory[];
  products: IProduct[];
}

// Define the type for selected components
interface SelectedComponents {
  [categoryName: string]: IProduct | null;
}

const PcBuilderPage = ({ categories, products }: PCBuilderProps) => {
  // Initialize selectedComponents with null for all 9 categories
  const [selectedComponents, setSelectedComponents] =
    useState<SelectedComponents>(
      categories.reduce((acc, category) => {
        acc[category.categoryName] = null; // Set null for each category to start with
        return acc;
      }, {} as SelectedComponents)
    );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const productsInCategory = products.filter(
      (product) => product.category === category
    );
    setCategoryProducts(productsInCategory);
    setIsModalVisible(true);
  };

  // Handle product selection for a category
  const handleProductSelect = (category: string, product: IProduct) => {
    setSelectedComponents((prevState: SelectedComponents) => {
      const updatedComponents = { ...prevState, [category]: product };
      calculateTotalPrice(updatedComponents);
      return updatedComponents;
    });
    setIsModalVisible(false);
  };

  // Calculate the total price based on selected components
  const calculateTotalPrice = (components: SelectedComponents) => {
    let total = 0;
    Object.values(components).forEach((component: any) => {
      if (component)
        total += parseFloat(component.price.replace("$", "").replace(",", ""));
    });
    setTotalPrice(total);
  };

  // Check if all categories have been selected
  const isReadyToProceed = Object.values(selectedComponents).every(
    (component) => component !== null
  );

  // Handle success modal visibility
  const handleProceedClick = () => {
    setIsSuccessModalVisible(true); // Show success modal when button is clicked
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false); // Hide success modal when closed
  };

  return (
    <div className="flex container mx-auto py-12">
      {/* Sidebar with Categories */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="cursor-pointer text-lg"
              onClick={() => handleCategorySelect(category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Selection */}
      <div className="w-3/4 ml-8">
        {/* Modal for selecting product */}
        {isModalVisible && selectedCategory && (
          <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-3/4 sm:w-1/2 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedCategory}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <div
                    key={product._id}
                    className="card w-60 bg-base-100 shadow-xl mb-4 cursor-pointer"
                    onClick={() =>
                      handleProductSelect(selectedCategory, product)
                    }
                  >
                    <figure>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="absolute top-2 right-2 text-xl font-bold text-gray-700"
                onClick={() => setIsModalVisible(false)}
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* Summary of Selected Components */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Your Selected Components
          </h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const selectedProduct = selectedComponents[category.categoryName];
              return (
                <div
                  key={category.categoryName}
                  className="flex justify-between"
                >
                  <span className="font-medium">{category.categoryName}:</span>
                  <span>
                    {selectedProduct
                      ? `${selectedProduct.name} - ${selectedProduct.price}`
                      : "Not Selected"}
                  </span>
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-semibold">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          disabled={!isReadyToProceed}
          className={`mt-6 px-6 py-2 rounded-lg text-white ${
            isReadyToProceed ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={handleProceedClick}
        >
          Proceed with Build
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModalVisible && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-4">Build Complete!</h2>
            <p>Your selected components:</p>
            <div className="space-y-4 mt-4">
              {categories.map((category) => {
                const selectedProduct =
                  selectedComponents[category.categoryName];
                return (
                  <div
                    key={category.categoryName}
                    className="flex justify-between"
                  >
                    <span className="font-medium">
                      {category.categoryName}:
                    </span>
                    <span>
                      {selectedProduct
                        ? `${selectedProduct.name} - ${selectedProduct.price}`
                        : "Not Selected"}
                    </span>
                  </div>
                );
              })}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg w-full"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcBuilderPage;

PcBuilderPage.getLayout = function getLayout(
  page: ReactElement,
  { categories }: { categories: ICategory[] }
) {
  return <MainLayout categories={categories}>{page}</MainLayout>;
};
