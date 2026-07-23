import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceRequestsApi, type ServiceRequest } from '../api/serviceRequests';

export default function RequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const response = await serviceRequestsApi.getAll(searchTerm);
      setRequests(response.data);
    } catch {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequests(search);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      await serviceRequestsApi.delete(id);
      setRequests(requests.filter((r) => r.id !== id));
    } catch {
      setError('Failed to delete request');
    }
  };

  const getBadgeClass = (status: string) => {
    const map: Record<string, string> = {
      OPEN: 'badge-open',
      IN_PROGRESS: 'badge-in-progress',
      RESOLVED: 'badge-resolved',
      CANCELLED: 'badge-cancelled',
    };
    return `badge ${map[status] || 'badge-open'}`;
  };

  return (
    <div className="container">
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Service Requests</h1>
          <p className="subtitle">Manage and track all internal service requests</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/requests/new')}>
          + Submit New Request
        </button>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary">Search</button>
        <button type="button" className="btn-secondary" onClick={() => { setSearch(''); fetchRequests(); }}>
          Clear
        </button>
      </form>

      <div className="divider" />

      {error && <p className="error">{error}</p>}
      {loading && <p style={{ color: '#d4a8be' }}>Loading...</p>}

      {!loading && requests.length === 0 && (
        <div className="empty-state">
          <span className="emoji">🌸</span>
          No service requests found. Click + New Request to get started
        </div>
      )}

      {requests.map((request) => (
        <div className="card" key={request.id}>
          <div>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p>👤 {request.requesterName} · 📧 {request.requesterEmail}</p>
            <p>📁 {request.category} &nbsp;·&nbsp; ⚡ {request.priority}</p>
            <span className={getBadgeClass(request.status)}>
              {request.status.replace('_', ' ')}
            </span>
          </div>
          <div className="actions">
            <button className="btn-secondary" onClick={() => navigate(`/requests/${request.id}/edit`)}>
               Edit
            </button>
            <button className="btn-danger" onClick={() => handleDelete(request.id)}>
               Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}