// Centralized API base URL (for both dev and prod).
// In Vercel, set VITE_API_BASE_URL to the deployed backend URL (e.g. https://my-backend.up.railway.app).
// In development, it defaults to http://localhost:5000.

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
