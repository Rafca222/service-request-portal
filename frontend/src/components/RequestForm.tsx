import React from 'react';
import FormField from './FormField';

interface FormData {
  title: string;
  description: string;
  category: string;
  priority: string;
  status?: string;
  requesterName: string;
  requesterEmail: string;
}

interface RequestFormProps {
  form: FormData;
  loading: boolean;
  error: string;
  isEdit?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function RequestForm({
  form,
  loading,
  error,
  isEdit = false,
  onChange,
  onSubmit,
  onCancel,
}: RequestFormProps) {
  return (
    <div className="form-card">
      {error && <p className="error">{error}</p>}

      <form onSubmit={onSubmit}>

        <FormField
          label="Your Name"
          name="requesterName"
          placeholder="Full name"
          value={form.requesterName}
          onChange={onChange}
          required
        />

        <FormField
          label="Your Email"
          name="requesterEmail"
          type="email"
          placeholder="your@email.com"
          value={form.requesterEmail}
          onChange={onChange}
          required
        />

        <FormField
          label="Title"
          name="title"
          placeholder="Brief summary of your request"
          value={form.title}
          onChange={onChange}
          required
        />

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your request in detail..."
            value={form.description}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={onChange}>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Facilities">Facilities</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={onChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {isEdit && (
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={onChange}>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (isEdit ? 'Saving...' : 'Submitting...') : (isEdit ? '✦ Save Changes' : '✦ Submit Request')}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}