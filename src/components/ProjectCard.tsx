import Image from "next/image";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
};

// One project: screenshot, title, description, tech tags, Live + GitHub buttons.
export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, tech, liveUrl, githubUrl, featured } =
    project;

  return (
    // "group": children can react when the whole card is hovered (group-hover:)
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900">
      {/* Screenshot (16:9). No image → a gradient box with the title */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-cyan-500 to-blue-600">
        {image ? (
          <Image
            src={image}
            alt={`Screenshot of ${title}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-2xl font-bold text-white">
            {title}
          </div>
        )}

        {featured && (
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow">
            <FiStar className="h-3 w-3" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 flex-1 text-slate-600 dark:text-slate-400">
          {description}
        </p>

        {/* Tech tags */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {tech.map((name) => (
            <li
              key={name}
              className="rounded-full bg-cyan-700/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              {name}
            </li>
          ))}
        </ul>

        {/* Buttons. Each one only shows when its url is not empty */}
        <div className="mt-6 flex gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              <FiExternalLink aria-hidden="true" />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-cyan-700 hover:text-cyan-700 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            >
              <FiGithub aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
