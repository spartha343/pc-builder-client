import { IProduct } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const FeaturedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Link href={`/products/${product._id}`}>
        <Image
          alt={product.name}
          src={product.imageUrl}
          width={100}
          height={100}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-gray-800">
            {product.price}
          </span>
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-full ${
              product.status === "In Stock"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {product.status}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 mr-1">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-gray-500">({product.rating})</span>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductCard;
