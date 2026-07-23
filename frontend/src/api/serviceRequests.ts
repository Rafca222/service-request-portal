import api from './client';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequestData {
  title: string;
  description: string;
  category: string;
  priority?: string;
  requesterName: string;
  requesterEmail: string;
}

export interface UpdateServiceRequestData {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  requesterName?: string;
  requesterEmail?: string;
}

export const serviceRequestsApi = {
  getAll: (search?: string) =>
    api.get<ServiceRequest[]>('/service-requests', {
      params: search ? { search } : {},
    }),

  getOne: (id: string) =>
    api.get<ServiceRequest>(`/service-requests/${id}`),

  create: (data: CreateServiceRequestData) =>
    api.post<ServiceRequest>('/service-requests', data),

  update: (id: string, data: UpdateServiceRequestData) =>
    api.patch<ServiceRequest>(`/service-requests/${id}`, data),

  delete: (id: string) =>
    api.delete(`/service-requests/${id}`),
};