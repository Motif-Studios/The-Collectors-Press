import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { getNotFoundPageData } from "./queries";
import { SecondaryMiniCard } from "@/components/ui/news_panels/secondary";
import Image from "next/image";
import Link from "next/link";

export async function NotFoundPageView() {
  const data = await getNotFoundPageData();
  console.log(data);

  return (
    <div className="my-16 flex flex-col gap-12">
      <section className="px-10">
        <div className="mx-auto flex max-w-300 items-center justify-between gap-20">
          <div className="relative w-full max-w-125 aspect-square">
            <Image
              src="/not_found.jpg"
              alt="404 illustration"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1 max-w-120 text-black">
            <h1 className="mb-5 text-4xl font-serif">Page not found.</h1>

            <p className="mb-4 text-[16px] leading-relaxed">
              We can’t find the page you’re looking for. It has likely either
              moved or no longer exists, or the website address is incorrect.
            </p>

            <p className="mb-4 text-[16px] leading-relaxed">
              We’re sorry for any inconvenience.
            </p>

            <Link
              href="/"
              className="underline font-semibold inline-block mb-4"
            >
              Back to Home
            </Link>

            <p className="mt-4 text-[16px]">
              For further assistance, contact our{" "}
              <a href="#" className="underline">
                Customer Care team
              </a>
            </p>
          </div>
        </div>
      </section>
      <Wrapper>
        <div className="mt-3 grid grid-cols-4 gap-4.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {data.map((card) => (
          <SecondaryMiniCard key={card.id} {...card} />
        ))}
      </div>
      </Wrapper>
    </div>
  );
}
