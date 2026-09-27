export const API_URL = process.env.REACT_APP_API_URL || '';

// Demo mode on by default; set REACT_APP_USE_MOCKS=false to hit a real API
export const USE_MOCKS = process.env.REACT_APP_USE_MOCKS !== 'false';
