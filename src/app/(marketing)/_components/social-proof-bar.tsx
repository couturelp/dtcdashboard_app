const METRICS = [
  { value: '500+', label: 'Brands tracking profit' },
  { value: '$12M+', label: 'Ad spend analyzed' },
  { value: '99.9%', label: 'Data sync uptime' },
  { value: '4 min', label: 'Average setup time' },
] as const;

export function SocialProofBar() {
  return (
    <section className="bg-brand-heading py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-gray-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
