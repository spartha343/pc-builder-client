// interfaces/Product.ts

export interface IKeyFeatures {
  brand: string;
  model: string;
  specs: string;
  voltage: string;
}

export interface IReview {
  user: string; // User ID or user name who left the review
  rating: number; // Rating out of 5
  comment: string; // Review comment
  date: string; // ISO string date of review
}

export interface IProduct {
  _id: string; // MongoDB ObjectId as string
  name: string; // Product name
  category:
    | "CPU"
    | "Motherboard"
    | "RAM"
    | "Power Supply Unit"
    | "Storage Device"
    | "Monitor"
    | "GPU"
    | "Mouse"
    | "Keyboard"
    | "Others"; // Product category
  price: string; // Price as a string (you can convert it to a number if needed for calculations)
  status: "In Stock" | "Out of Stock"; // Stock status
  rating: number; // Rating out of 5
  imageUrl: string; // URL to the product image
  description: string; // Product description
  keyFeatures: IKeyFeatures; // Key features object
  reviews: IReview[]; // Array of reviews
  averageRating: number; // Average rating of the product based on reviews
}
