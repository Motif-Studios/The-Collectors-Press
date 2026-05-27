import { Wrapper } from "@/components/layout/wrapper/Wrapper";

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Wrapper className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[720px] rounded-[28px] border border-[#e3e3e3] bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-12">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#111] sm:text-4xl">
            About The Collectors Press
          </h1>

          <div className="space-y-6 text-[#6c7680]">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-[#111]">Our Story</h2>
              <p className="leading-relaxed">
                Founded in 2026, The Collectors Press (TCP) was created to deliver quality journalism for collectors around the world. Covering everything from trading card games to memorabilia, autographs and sealed products, TCP is dedicated to telling the stories that matter most to the hobby community.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-[#111]">Our Coverage</h2>
              <p className="mb-4 leading-relaxed">
                At TCP, we go beyond surface-level reporting. Our coverage includes:
              </p>
              <ul className="ml-4 space-y-2">
                <li className="flex leading-relaxed">
                  <span className="mr-3">•</span>
                  <span>News and opinions on product releases</span>
                </li>
                <li className="flex leading-relaxed">
                  <span className="mr-3">•</span>
                  <span>In-depth analysis of various collectible markets</span>
                </li>
                <li className="flex leading-relaxed">
                  <span className="mr-3">•</span>
                  <span>Performance of collectibles as an alternative investment</span>
                </li>
                <li className="flex leading-relaxed">
                  <span className="mr-3">•</span>
                  <span>Feature stories on collections around the world</span>
                </li>
                <li className="flex leading-relaxed">
                  <span className="mr-3">•</span>
                  <span>Interviews with prominent collectors and industry figures</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-[#111]">What Sets Us Apart</h2>
              <p className="leading-relaxed">
                What truly sets TCP apart are the people behind the writing. Our contributors are collectors at heart. Individuals who understand the excitement of a major pull, the nostalgia tied to collectible items, and the dedication required to build something meaningful over time. We believe the best journalism in the collectibles space comes from writers who live and breathe the hobby.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-[#111]">Our Commitment</h2>
              <p className="leading-relaxed">
                As the collectibles industry continues to expand globally, TCP remains committed to producing high-quality editorial content that informs and celebrates the passion of every collector.
              </p>
            </section>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
