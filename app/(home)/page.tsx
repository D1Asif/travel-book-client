import FeedComponent from "@/components/home/FeedComponent";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { searchTerm, sort, filter } = searchParams;
  return (
    <div>
      <FeedComponent searchTerm={searchTerm} sort={sort} filter={filter} />
    </div>
  );
}
