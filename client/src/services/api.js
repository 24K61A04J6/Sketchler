import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Bio endpoints
export const getBio = () => apiClient.get('/bio');

// Artwork endpoints
export const getArtworks = (params = {}) => 
  apiClient.get('/artworks', { params }).then(res => res.data);

export const getArtworkById = (id) => 
  apiClient.get(`/artworks/${id}`).then(res => res.data);

export const createArtwork = (data, token) => 
  apiClient.post('/admin/artworks', data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

export const updateArtwork = (id, data, token) => 
  apiClient.put(`/admin/artworks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

export const deleteArtwork = (id, token) => 
  apiClient.delete(`/admin/artworks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

// Contact endpoints
export const submitContactForm = (data) => 
  apiClient.post('/contact', data).then(res => res.data);

// Admin endpoints
export const adminLogin = (data) => 
  apiClient.post('/admin/login', data).then(res => res.data);

export const adminRegister = (data) => 
  apiClient.post('/admin/register', data).then(res => res.data);

export const getContacts = (token) => 
  apiClient.get('/admin/contacts', {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

export const updateContactStatus = (id, status, token) => 
  apiClient.put(`/admin/contacts/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

export default apiClient;
