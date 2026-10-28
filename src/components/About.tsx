import { FiUser, FiZap } from "react-icons/fi";
import { about, personal } from "@/data/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

// About section: a quick info card (left) + my story (right).
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <SectionHeading
          number="01"
          title="About Me"
          subtitle="Who I am and how I work"
        />
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
        {/* Left: quick info card */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-4 flex items-center gap-2 font-semibold">
              <FiUser className="text-cyan-700 dark:text-cyan-400" />
              Quick info
            </p>
            {/* <dl> = description list: pairs of a term (dt) and its value (dd) */}
            <dl className="space-y-4">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-medium wrap-break-word">
                    {/* A link if the fact has an href (email, phone), else plain text */}
                    {fact.href ? (
                      <a
                        href={fact.href}
                        className="transition-colors hover:text-cyan-700 dark:hover:text-cyan-400"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                    {fact.detail && (
                      <span className="mt-0.5 block text-sm font-normal text-slate-500 dark:text-slate-400">
                        {fact.detail}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Green "open to work" line, same text as the Hero badge */}
            {personal.availability && (
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {personal.availability}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Right: my story */}
        <div>
          {about.paragraphs.map((paragraph, index) => (
            <FadeIn key={paragraph} delay={0.1 * (index + 1)}>
              <p className="mb-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {paragraph}
              </p>
            </FadeIn>
          ))}

          <FadeIn delay={0.4}>
            <blockquote className="mt-6 border-l-4 border-cyan-700 pl-4 text-slate-700 italic dark:border-cyan-400 dark:text-slate-300">
              &ldquo;{about.motto}&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="mt-8 mb-3 flex items-center gap-2 font-semibold">
              <FiZap className="text-cyan-700 dark:text-cyan-400" />
              Currently learning
            </p>
            <ul className="flex flex-wrap gap-2">
              {about.learning.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
