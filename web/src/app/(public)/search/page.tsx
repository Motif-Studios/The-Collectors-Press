import { SearchBar } from "@/features/search/components/SearchBar";
import { SearchPageView } from "@/features/search/SearchPageView";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q ?? "";

  return (
    <Wrapper className="my-12">
        <SearchBar />
        <SearchPageView searchQuery={searchQuery} />
    </Wrapper>
  );
}
