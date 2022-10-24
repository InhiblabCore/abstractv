import { request, axiosInstance } from '@/network/axios'

export function getFilters(projectId: number) {
  return request('/filter', { method: 'GET', params: { projectId } })
}

export function createFilter(data: any) {
  return axiosInstance.post('/filter', data)
}

export function updateFilter(data: any) {
  return axiosInstance.put(`/filter/${data.id}`, data)
}

export function updateFilterName(data: any) {
  return axiosInstance.put(`/filter/${data.id}/name`, data)
}

export function deleteFilter(id: number) {
  return request(`/filter/${id}`, {
    method: 'DELETE',
  })
}
