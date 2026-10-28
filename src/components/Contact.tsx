import type { IconType } from "react-icons";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { personal } from "@/data/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import ContactForm from "@/components/ContactForm";

type ContactDetail = {
  icon: IconType;
  label: string;
  value: string;
  href?: string; // optional: Location has no link
};

// Contact section: how to reach me (left) + the contact form (right).
export default function Contact() {
  // Contact details. Items with an empty value are hidden.
  const details: ContactDetail[] = [
    {
      icon: FiMail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone.replace(/[\s-]/g, "")}`,
    },
    { icon: FiMapPin, label: "Location", value: personal.location },
  ].filter((item) => item.value);

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <SectionHeading
          number="04"
          title="Contact"
          subtitle="Have a role or a project in mind? Let's talk."
        />
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left: text + contact details + socials */}
        <FadeIn delay={0.1}>
          <h3 className="text-2xl font-bold">Let&apos;s work together</h3>
          <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            I&apos;m{" "}
            {(
              personal.availability || "Open to new opportunities"
            ).toLowerCase()}{" "}
            and happy to talk about full-stack and MERN work. Send me a message
            and I&apos;ll reply within 24 hours.
          </p>

          <ul className="mt-8 space-y-4">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-700/10 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium wrap-break-word transition-colors hover:text-cyan-700 dark:hover:text-cyan-400"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <SocialLinks className="mt-8" />
        </FadeIn>

        {/* Right: the form */}
        <FadeIn delay={0.2}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
