import { Wrapper } from "@/components/layout/wrapper/Wrapper";

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[#e6e6e6] ${className}`} />;
}

// Mirrors the Primary/Secondary news panel layout so the page doesn't jump when data arrives
export function HomePageSkeleton() {
  return (
    <div className="my-16 flex flex-col gap-12" aria-busy="true" aria-label="Loading stories">
      <Wrapper>
        <div className="grid grid-cols-[1fr_1.25fr] items-start gap-9.5 max-[900px]:grid-cols-1 max-[900px]:gap-7">
          <div className="flex flex-col gap-6 border-r border-[#d9d9d9] pr-9.5 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:pb-7 max-[900px]:pr-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Bar className="h-3.5 w-20" />
                <Bar className="h-6 w-full" />
                <Bar className="h-4 w-4/5" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Bar className="h-82.5 w-full max-[600px]:h-55" />
            <Bar className="h-4 w-24" />
            <Bar className="h-9 w-11/12" />
            <Bar className="h-4 w-3/4" />
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="grid grid-cols-2 gap-x-[18px] gap-y-6 max-[900px]:grid-cols-1">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Bar className="h-48 w-full" />
              <Bar className="h-6 w-5/6" />
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-4.5 pt-20 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Bar className="h-28 w-full" />
              <Bar className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
