export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Help Article</h1>
      <p className="mt-2 text-gray-600">
        Category: {category} / Article: {slug}
      </p>
    </div>
  );
}
