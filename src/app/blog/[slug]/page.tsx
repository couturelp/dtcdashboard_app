export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="mt-2 text-gray-600">Article: {slug}</p>
    </div>
  );
}
