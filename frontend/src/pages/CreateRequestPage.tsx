import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceRequestsApi } from '../api/serviceRequests';

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'IT',
    priority: 'MEDIUM',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await serviceRequestsApi.create(form);
      navigate('/requests');
    } catch {
      setError('Failed to create request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>New Request</h1>
      <p className="subtitle">Fill in the details below to submit a new service request</p>

      <div className="form-card">
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              placeholder="Brief summary of your request"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe your request in detail..."
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

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : '✦ Submit Request'}
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