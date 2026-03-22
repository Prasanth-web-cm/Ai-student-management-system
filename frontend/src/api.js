export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

if (import.meta.env.MODE !== 'test') {
    console.log(`[API] Base URL configured as: ${API_BASE}`);
}
