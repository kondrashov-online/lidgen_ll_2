import axios from 'axios';

// Get backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token handling
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

const setAuthToken = (token) => {
  localStorage.setItem('auth_token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
  delete api.defaults.headers.common['Authorization'];
};

// Initialize token if exists
const token = getAuthToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      // Optionally redirect to login
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const siteInfoAPI = {
  getSiteInfo: () => api.get('/site-info'),
};

export const servicesAPI = {
  getServices: () => api.get('/services'),
  getServiceBySlug: (slug) => api.get(`/services/${slug}`),
  // Admin endpoints
  getAdminServices: () => api.get('/admin/services'),
  createService: (serviceData) => api.post('/admin/services', serviceData),
  updateService: (id, serviceData) => api.put(`/admin/services/${id}`, serviceData),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
};

export const blogAPI = {
  getPosts: (limit = 10, skip = 0) => api.get('/blog/posts', { params: { limit, skip } }),
  getPostBySlug: (slug) => api.get(`/blog/posts/${slug}`),
  // Admin endpoints
  getAdminPosts: () => api.get('/admin/blog/posts'),
  createPost: (postData) => api.post('/admin/blog/posts', postData),
  updatePost: (id, postData) => api.put(`/admin/blog/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/admin/blog/posts/${id}`),
};

export const reviewsAPI = {
  getReviews: (limit = 20) => api.get('/reviews', { params: { limit } }),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  // Admin endpoints
  getPendingReviews: () => api.get('/admin/reviews/pending'),
  approveReview: (id) => api.put(`/admin/reviews/${id}/approve`),
  deleteReview: (id) => api.delete(`/admin/reviews/${id}`),
};

export const newsAPI = {
  getNews: (limit = 10) => api.get('/news', { params: { limit } }),
  // Admin endpoints
  createNews: (newsData) => api.post('/admin/news', newsData),
  updateNews: (id, newsData) => api.put(`/admin/news/${id}`, newsData),
  deleteNews: (id) => api.delete(`/admin/news/${id}`),
};

export const galleryAPI = {
  getImages: () => api.get('/gallery'),
};

export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  // Admin endpoints
  getAllBookings: () => api.get('/admin/bookings'),
  updateBookingStatus: (id, status, adminNotes) => 
    api.put(`/admin/bookings/${id}/status`, { status, admin_notes: adminNotes }),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    removeAuthToken();
    return Promise.resolve();
  },
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
};

// Auth helper functions
export const authHelpers = {
  setToken: setAuthToken,
  removeToken: removeAuthToken,
  getToken: getAuthToken,
  isAuthenticated: () => !!getAuthToken(),
};

export default api;