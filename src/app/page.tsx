import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// The home page: puts all sections in order.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
