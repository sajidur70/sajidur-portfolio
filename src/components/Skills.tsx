import { skills } from "@/data/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/SkillCard";

// Skills section: one animated card per category.
export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <SectionHeading
          number="02"
          title="Skills"
          subtitle="The tools I use to build, test and ship"
        />
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, index) => (
          <SkillCard
            key={group.category}
            category={group.category}
            items={group.items}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
