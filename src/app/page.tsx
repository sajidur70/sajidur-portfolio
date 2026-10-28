import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

// The home page: puts all sections in order.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
