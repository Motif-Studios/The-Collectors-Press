"use client";

import React, { useState } from "react";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";

const WRITING_CRITERIA = [
  {
    label: "Original reporting",
    detail:
      "We value fresh angles, primary sources, and ideas that haven't been covered to death elsewhere.",
  },
  {
    label: "A distinct voice",
    detail:
      "Our readers are smart. Write as if you're talking to a well-read friend, not filing a press release.",
  },
  {
    label: "Collector's world knowledge",
    detail:
      "Deep familiarity with markets, culture, sport, or business — ideally where they intersect.",
  },
  {
    label: "Reliable facts",
    detail:
      "We fact-check everything. Your submission should be accurate and attributable before it reaches us.",
  },
];

export default function WriteForUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    section: "",
    pitchTitle: "",
    pitch: "",
    links: "",
    experience: "",
  });

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
   
  
      try{
          const response = await fetch("http://localhost:5001/email/write-for-us", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
  
      const result = await response.json();
        
      if (result.success) {
          console.log("Email sent successfully");
      } else {
          console.error("Error sending email:", result.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  
       setSubmitted(true);
  }
  

  return (
    <Wrapper className="py-10 sm:py-14">
    <main className="bg-white font-[Georgia,'Times_New_Roman',serif]">

      {/* Hero — full-width editorial statement */}
      <div className="border-b border-black/10 bg-black px-6 py-16 text-center text-white">
        <p className="mb-3 font-sans text-[0.68rem] font-bold uppercase tracking-[2.5px] text-white/50">
          Contributor applications
        </p>
        <h1 className="mx-auto max-w-3xl text-[2.6rem] font-bold leading-[1.05] md:text-[3rem]">
          Write for The Collectors Press
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-white/70">
          We commission writers, analysts, and experts who have something
          genuinely worth saying. Here&apos;s what we look for.
        </p>
      </div>

      {/* Criteria section */}
      <div className="border-b border-black/10 bg-[#f7f7f7] px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <p className="mb-8 font-sans text-[0.68rem] font-bold uppercase tracking-[2.5px] text-[#888]">
            What we publish
          </p>
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {WRITING_CRITERIA.map((item, i) => (
              <div key={item.label} className="flex gap-4">
                <span className="mt-0.5 font-sans text-[0.75rem] font-bold text-[#bbb]">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-bold leading-snug text-black">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[0.9rem] leading-[1.65] text-[#555]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application form */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-[860px]">
          <h2 className="mb-1 text-[1.9rem] font-bold text-black md:text-[2.4rem]">
            Submit your application
          </h2>
          <p className="mb-10 text-[0.95rem] leading-[1.7] text-[#555]">
            Tell us about yourself and pitch your first story. We review all
            applications and respond within two weeks.
          </p>

          {submitted ? (
            <div className="border-l-[3px] border-black py-4 pl-5">
              <h3 className="text-[1.8rem] font-bold text-black">
                Application received.
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.7] text-[#444]">
                We&apos;ll read your pitch carefully and be in touch within two
                weeks. Thank you for your interest in writing for us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Personal details */}
              <fieldset className="space-y-8">
                <legend className="mb-6 border-b border-black/10 pb-3 font-sans text-[0.68rem] font-bold uppercase tracking-[2.5px] text-[#888]">
                  About you
                </legend>
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
                    Which section fits your writing best?
                  </label>
                  <select
                    name="section"
                    required
                    value={form.section}
                    onChange={handleChange}
                    className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black outline-none transition-colors focus:border-black"
                  >
                    <option value="" disabled>
                      Select a section
                    </option>
                    <option value="pokémon">Pokémon</option>
                    <option value="one-piece">One Piece</option>
                    <option value="basketball">Basketball</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Brief bio
                  </label>
                  <textarea
                    name="bio"
                    required
                    rows={3}
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Who are you and what's your background? 2–3 sentences is fine."
                    className="w-full resize-none border-b border-black/30 bg-transparent pb-2 text-[1rem] leading-[1.6] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Links to previous work{" "}
                    <span className="normal-case tracking-normal text-[#aaa]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="links"
                    value={form.links}
                    onChange={handleChange}
                    placeholder="Portfolio URL, published articles, Substack, etc."
                    className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>
              </fieldset>

              {/* Pitch */}
              <fieldset className="space-y-8">
                <legend className="mb-6 border-b border-black/10 pb-3 font-sans text-[0.68rem] font-bold uppercase tracking-[2.5px] text-[#888]">
                  Your pitch
                </legend>

                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Working headline
                  </label>
                  <input
                    type="text"
                    name="pitchTitle"
                    required
                    value={form.pitchTitle}
                    onChange={handleChange}
                    placeholder="The headline you'd want on the page"
                    className="w-full border-b border-black/30 bg-transparent pb-2 text-[1rem] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[2px] text-[#888]">
                    Pitch — what's the story and why does it matter?
                  </label>
                  <textarea
                    name="pitch"
                    required
                    rows={7}
                    value={form.pitch}
                    onChange={handleChange}
                    placeholder="Describe the story, your angle, the sources you'd use, and why readers of The Collectors Press need to read it. 150–300 words is ideal."
                    className="w-full resize-none border-b border-black/30 bg-transparent pb-2 text-[1rem] leading-[1.6] text-black placeholder-[#bbb] outline-none transition-colors focus:border-black"
                  />
                </div>
              </fieldset>

              <div className="flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  className="bg-black px-10 py-3.5 font-sans text-[0.85rem] font-bold uppercase tracking-[2px] text-white transition-opacity hover:opacity-75"
                >
                  Submit application
                </button>
                <p className="text-[0.82rem] leading-[1.5] text-[#999]">
                  We read every pitch.
                  <br />
                  No simultaneous submissions please.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
    </Wrapper>
  );
}