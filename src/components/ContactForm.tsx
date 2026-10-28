"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { FiAlertCircle, FiCheckCircle, FiSend } from "react-icons/fi";
import { personal } from "@/data/portfolio";

// The key comes from .env.local (on my computer) or from Vercel's settings (live site).
// NEXT_PUBLIC_ = Next.js may use it in browser code. It is safe: Web3Forms keys are public.
// process.env values are "string | undefined", so ?? "" makes it always a string.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

// The 4 states of the form. A union type: status can only be one of these.
type Status = "idle" | "sending" | "success" | "error";

// What Web3Forms sends back
type Web3FormsResponse = {
  success: boolean;
  message: string;
};

// Same style for all inputs
const inputStyle =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-600/20 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20";

// Contact form: sends the message to my Gmail with Web3Forms (no backend needed).
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    const form = event.currentTarget; // save the form now (before "await")
    setStatus("sending");

    // FormData reads all inputs that have a "name"
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New message from your portfolio");
    formData.append("from_name", "Portfolio contact form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data: Web3FormsResponse = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset(); // clear the inputs
      } else {
        setStatus("error");
      }
    } catch {
      // No internet, or the service is down
      setStatus("error");
    }
  }

  // No key set → don't show a form that can't work
  if (!ACCESS_KEY) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-slate-600 dark:border-slate-700 dark:text-slate-400">
        The contact form is not set up yet. Please email me at{" "}
        <a
          href={`mailto:${personal.email}`}
          className="font-medium text-cyan-700 dark:text-cyan-400"
        >
          {personal.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Spam trap: hidden from people. Bots fill it in, and Web3Forms rejects them */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={150}
          autoComplete="email"
          placeholder="you@company.com"
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Hi Sajidur, we have a role that fits you..."
          className={`${inputStyle} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-700 px-6 py-3 font-medium text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
      >
        <FiSend aria-hidden="true" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {/* aria-live: screen readers read the result out loud when it appears */}
      <div aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <FiCheckCircle aria-hidden="true" />
            Thank you! Your message was sent. I&apos;ll reply soon.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
            <FiAlertCircle aria-hidden="true" />
            Something went wrong. Please try again, or email me at{" "}
            {personal.email}.
          </p>
        )}
      </div>
    </form>
  );
}
