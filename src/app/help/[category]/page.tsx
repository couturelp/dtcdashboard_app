export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Help Category</h1>
      <p className="mt-2 text-gray-600">Category: {category}</p>
    </div>
  );
}
