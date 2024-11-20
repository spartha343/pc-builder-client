import Link from "next/link";

const HomePageHeroSection = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://builtin.com/sites/www.builtin.com/files/2024-10/hardware.png)"
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Build Your PC Today</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href={"/build-pc"}>
            <button className="btn btn-primary">Start Building</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeroSection;
