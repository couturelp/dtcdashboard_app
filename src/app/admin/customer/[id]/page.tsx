export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Customer Detail</h1>
      <p className="mt-2 text-gray-600">Customer ID: {id}</p>
    </div>
  );
}
