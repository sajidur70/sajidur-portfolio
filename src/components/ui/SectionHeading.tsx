type SectionHeadingProps = {
  number: string; // e.g. "01"
  title: string;
  subtitle?: string; // optional
};

// The same heading style for every section, e.g. "01. About Me".
export default function SectionHeading({
  number,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <p className="font-mono text-sm text-cyan-700 dark:text-cyan-400">
        {number}.
      </p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {/* Only show the subtitle if I pass one */}
      {subtitle && (
        <p className="mt-3 text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-cyan-500 to-blue-500" />
    </div>
  );
}
