'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Customer {
  user_id: string;
  email: string;
  store_name: string;
  signup_date: string;
  subscription_status: string | null;
  db_status: string | null;
  last_connection_test: boolean | null;
  last_sync: string | null;
}

interface Summary {
  totalCustomers: number;
  activeSubscribers: number;
  totalDatabases: number;
}

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// Sortable columns config
const COLUMNS = [
  { key: 'email', label: 'Email' },
  { key: 'store_name', label: 'Store Name' },
  { key: 'signup_date', label: 'Signup Date' },
  { key: 'subscription_status', label: 'Subscription' },
  { key: 'db_status', label: 'Database' },
] as const;

// Status badge component
function StatusBadge({ status, colorMap }: { status: string | null; colorMap: Record<string, string> }) {
  const label = status || 'None';
  const color = colorMap[status || 'none'] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

const SUB_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  trialing: 'bg-blue-100 text-blue-700',
  past_due: 'bg-yellow-100 text-yellow-700',
  canceled: 'bg-red-100 text-red-700',
  none: 'bg-gray-100 text-gray-600',
};

const DB_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  provisioning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  deleting: 'bg-orange-100 text-orange-700',
  none: 'bg-gray-100 text-gray-600',
};

export default function AdminCustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalCustomers: 0, activeSubscribers: 0, totalDatabases: 0 });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, totalItems: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('signup_date');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const [filterTier, setFilterTier] = useState('');
  const [filterDbStatus, setFilterDbStatus] = useState('');
  const [page, setPage] = useState(1);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('sort', sort);
      params.set('dir', dir);
      if (search) params.set('search', search);
      if (filterTier) params.set('tier', filterTier);
      if (filterDbStatus) params.set('db_status', filterDbStatus);

      const res = await fetch(`/api/admin/customers?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCustomers(data.customers);
      setSummary(data.summary);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  }, [page, sort, dir, search, filterTier, filterDbStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchCustomers, search]);

  function handleSort(key: string) {
    if (sort === key) {
      setDir(dir === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(key);
      setDir('asc');
    }
    setPage(1);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-500">Total Customers</div>
          <div className="text-2xl font-bold">{summary.totalCustomers}</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-500">Active Subscribers</div>
          <div className="text-2xl font-bold">{summary.activeSubscribers}</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-500">Active Databases</div>
          <div className="text-2xl font-bold">{summary.totalDatabases}</div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by email or store name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 flex-1 text-sm"
        />
        <select
          value={filterTier}
          onChange={(e) => { setFilterTier(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Tiers</option>
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
        <select
          value={filterDbStatus}
          onChange={(e) => { setFilterDbStatus(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All DB Status</option>
          <option value="active">Active</option>
          <option value="provisioning">Provisioning</option>
          <option value="error">Error</option>
          <option value="deleting">Deleting</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 select-none"
                >
                  {col.label}
                  {sort === col.key && (
                    <span className="ml-1">{dir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c.user_id}
                  onClick={() => router.push(`/admin/customer/${c.user_id}`)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.store_name}</td>
                  <td className="px-4 py-3">{new Date(c.signup_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.subscription_status} colorMap={SUB_COLORS} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.db_status} colorMap={DB_COLORS} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages} ({pagination.totalItems} total)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= pagination.totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
