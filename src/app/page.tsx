import Navbar from "@/components/Navbar";

// The home page: puts all sections in order.
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24">{/* Sections come here, step by step */}</main>
    </>
  );
}
