import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ICategory } from "@/interfaces/category.interface";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  categories: ICategory[];
}

const MainLayout = ({ children, categories = [] }: MainLayoutProps) => {
  return (
    <>
      <Navbar categories={categories} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
