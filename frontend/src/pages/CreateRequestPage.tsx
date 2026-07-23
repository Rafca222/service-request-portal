import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceRequestsApi } from '../api/serviceRequests';
import RequestForm from '../components/RequestForm';

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'IT',
    priority: 'MEDIUM',
    requesterName: '',
    requesterEmail: '',
  });

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
    setError('Please enter a description');
    return;
  }

  try {
    setLoading(true);
    setError('');
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
      <RequestForm
        form={form}
        loading={loading}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/requests')}
      />
    </div>
  );
}