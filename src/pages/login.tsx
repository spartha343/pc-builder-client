import { ICategory } from "@/interfaces/category.interface";
import MainLayout from "@/layouts/MainLayout";
import { GetStaticProps } from "next";
import { signIn } from "next-auth/react";
import { ReactElement } from "react";

const login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={() => signIn("github")}
        className="btn btn-primary btn-accent text-white "
      >
        Sign in With GitHub
      </button>
    </div>
  );
};

export default login;

login.getLayout = function getLayout(
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

  return { props: { categories } };
};
