import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiMail } from "react-icons/fi";

// Browser tab title for this page → "Page not found | Sajidur Rahman"
export const metadata: Metadata = {
  title: "Page not found",
};

// Custom 404 page: shown for any URL that doesn't exist, e.g. /abc
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Big gradient "404" */}
      <p className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text font-mono text-8xl font-bold text-transparent sm:text-9xl dark:from-cyan-400 dark:to-blue-400">
        404
      </p>

      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-lg text-slate-600 dark:text-slate-400">
        This page doesn&apos;t exist or was moved. Let&apos;s get you back on
        track.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {/* <Link> = Next.js link: goes to another page without a full reload */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-cyan-700 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-cyan-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to home
        </Link>
        <Link
          href="/#contact"
          className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-medium transition hover:scale-105 hover:border-cyan-700 hover:text-cyan-700 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
        >
          <FiMail aria-hidden="true" />
          Contact me
        </Link>
      </div>
    </main>
  );
}
