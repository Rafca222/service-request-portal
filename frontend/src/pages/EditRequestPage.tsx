import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceRequestsApi } from '../api/serviceRequests';

export default function EditRequestPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'IT',
    priority: 'MEDIUM',
    status: 'OPEN',
    requesterName: '',
    requesterEmail: '',
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await serviceRequestsApi.getOne(id!);
        const { title, description, category, priority, status, requesterName, requesterEmail } = response.data;
        setForm({ title, description, category, priority, status, requesterName, requesterEmail });
      } catch {
        setError('Failed to load request');
      } finally {
        setFetching(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await serviceRequestsApi.update(id!, form);
      navigate('/requests');
    } catch {
      setError('Failed to update request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="container"><p style={{ color: '#d4a8be' }}>Loading...</p></div>;

  return (
    <div className="container">
      <h1>Edit Request</h1>
      <p className="subtitle">Update the details of this service request</p>

      <div className="form-card">
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              name="requesterName"
              value={form.requesterName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              name="requesterEmail"
              type="email"
              value={form.requesterEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Facilities">Facilities</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : '✦ Save Changes'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/requests')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}