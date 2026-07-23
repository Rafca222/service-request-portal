import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceRequestsApi } from '../api/serviceRequests';
import RequestForm from '../components/RequestForm';

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

  if (!form.requesterName.trim()) {
    setError('Please enter your full name');
    return;
  }
  if (!form.requesterEmail.trim()) {
    setError('Please enter your email address');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.requesterEmail)) {
    setError('Please enter a valid email address (e.g. name@example.com)');
    return;
  }
  if (!form.title.trim()) {
    setError('Please enter a title for your request');
    return;
  }
  if (!form.description.trim()) {
    setError('Please enter a description for your request');
    return;
  }

  try {
    setLoading(true);
    setError('');
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
      <RequestForm
        form={form}
        loading={loading}
        error={error}
        isEdit={true}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/requests')}
      />
    </div>
  );
}