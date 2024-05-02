import Footer from "../ui/Footer";
import Header from "../ui/Header";

export default function Page() {
  return (
    <div className="not-home">
      <Header />
      <main className="my-20 px-10">
        <div className="flex flex-col gap-16 text-center">
          <h1 className="text-5xl uppercase font-bold">blog</h1>
          <span className="uppercase lg:text-8xl text-5xl font-bold">
            coming soon
          </span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
