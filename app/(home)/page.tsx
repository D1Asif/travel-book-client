import FeedComponent from "@/components/home/FeedComponent";

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { searchTerm, sort } = searchParams;
  return (
    <div>
      <FeedComponent searchTerm={searchTerm} sort={sort} />
    </div>
  );
}
