import { ICategory } from "@/interfaces/category.interface";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = ({ categories }: { categories: ICategory[] }) => {
  const { data: session } = useSession();
  const categoryItems = (
    <ul className="p-2">
      {categories.map((item) => (
        <li key={item._id}>
          <Link href={`/categories/${item.categoryName}`}>
            {item.categoryName}
          </Link>
        </li>
      ))}
    </ul>
  );

  const navLinks = [
    {
      linkName: "Home",
      linkPath: "/"
    },
    {
      linkName: "Products",
      linkPath: "/products"
    }
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.linkPath}>{link.linkName}</Link>
              </li>
            ))}
            <li>
              <a>Categories</a>
              {categoryItems}
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          PC Builder
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link href={link.linkPath}>{link.linkName}</Link>
            </li>
          ))}
          <li>
            <details>
              <summary>Categories</summary>
              {categoryItems}
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          href="/build-pc"
          className="btn btn-primary btn-accent text-white mr-2"
        >
          Build your PC
        </Link>
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="btn btn-primary btn-accent text-white "
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="btn btn-primary btn-accent text-white "
          >
            Sign in With GitHub
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
