import { FiArrowUp } from "react-icons/fi";
import { personal } from "@/data/portfolio";
import SocialLinks from "@/components/ui/SocialLinks";

// Next.js 16 doesn't allow `new Date()` directly while building a static page
// (the value could change). "use cache" = compute it once at build time and reuse it.
// Every new deploy builds again, so the year stays correct.
async function getCurrentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

// Footer: copyright, social icons and a "back to top" link.
export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      {/* dark:pb-20: extra space at the bottom in dark mode, so the palette bar
          (fixed at the bottom-left) doesn't cover the footer text */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between dark:pb-20">
        <div className="text-center md:text-left">
          <p className="font-medium">
            © {year} {personal.name}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Built with Next.js, TypeScript, Tailwind CSS and Motion. Deployed on Vercel.
          </p>
        </div>

        <SocialLinks />

        <a
          href="#home"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          Back to top
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
