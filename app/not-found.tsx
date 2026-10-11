import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
    <Header />
    <main id="main" className="flex-1">
    <section className="py-28">
      <div className="container-x max-w-2xl">
        <h1 className="text-h1">This page has moved or no longer exists.</h1>
        <p className="mt-5 text-lg text-stone">
          Our website has a new structure. Choose where you want to go, or ask an advisor directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-dark">Go to the homepage</Link>
          <Link href="/online-programs" className="btn btn-outline">Browse online programmes</Link>
          <Link href="/contact" className="btn btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
