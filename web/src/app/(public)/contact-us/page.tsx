"use client";

import React, { useState } from "react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white font-[Georgia,'Times_New_Roman',serif]">
      {/* Page header */}
      <div className="border-b border-black/10 px-6 py-10 text-center">
        <p className="mb-2 font-sans text-[0.7rem] font-bold uppercase tracking-[2.5px] text-[#888]">
          Get in touch
        </p>
        <h1 className="text-[2.8rem] font-bold leading-[1.05] text-black md:text-[3.6rem]">
          Contact Us
        </h1>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1100px] px-6 py-16 lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-20">

        {/* Left: info column */}
        <div className="mb-14 lg:mb-0">
          <div className="border-l-[3px] border-black pl-5">
            <p className="text-[1.08rem] leading-[1.7] text-[#222]">
              We read every message. Whether you have a story tip, a correction
              to flag, or a general enquiry, the right person will see it.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <p className="mb-1 font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                Editorial
              </p>
              <p className="text-[0.95rem] leading-[1.6] text-[#222]">
                Story tips, corrections, and feedback on our coverage.
              </p>
              <a
                href="mailto:editorial@thecollectorspress.com"
                className="mt-1 block text-[0.95rem] text-black underline underline-offset-2"
              >
                editorial@thecollectorspress.com
              </a>
            </div>

            <div>
              <p className="mb-1 font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                Subscriptions
              </p>
              <p className="text-[0.95rem] leading-[1.6] text-[#222]">
                Billing, account access, and subscription enquiries.
              </p>
              <a
                href="mailto:subscriptions@thecollectorspress.com"
                className="mt-1 block text-[0.95rem] text-black underline underline-offset-2"
              >
                subscriptions@thecollectorspress.com
              </a>
            </div>

            <div>
              <p className="mb-1 font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                Advertising
              </p>
              <p className="text-[0.95rem] leading-[1.6] text-[#222]">
                Partnerships and commercial opportunities.
              </p>
              <a
                href="mailto:advertising@thecollectorspress.com"
                className="mt-1 block text-[0.95rem] text-black underline underline-offset-2"
              >
                advertising@thecollectorspress.com
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-black/10 pt-8">
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
              Response time
            </p>
            <p className="mt-2 text-[0.92rem] leading-[1.6] text-[#555]">
              We aim to respond to all enquiries within two business days.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div className="flex min-h-[400px] flex-col items-start justify-center">
              <div className="border-l-[3px] border-black pl-5">
                <h2 className="text-[2rem] font-bold leading-tight text-black">
                  Message received.
                </h2>
                <p className="mt-3 text-[1rem] leading-[1.7] text-[#444]">
                  Thank you for reaching out. We&apos;ll be in touch shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                  Subject
                </label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black outline-none transition-colors focus:border-black"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="editorial">Editorial enquiry</option>
                  <option value="correction">Correction or feedback</option>
                  <option value="subscription">Subscription help</option>
                  <option value="advertising">Advertising</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  className="w-full resize-none border-b border-black/30 bg-transparent pb-2 text-[1rem] leading-[1.6] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-black px-10 py-3.5 font-sans text-[0.85rem] font-bold uppercase tracking-[2px] text-white transition-opacity hover:opacity-75"
                >
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}