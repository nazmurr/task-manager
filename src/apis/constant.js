export const API_BASE_URL = process.env.NODE_ENV === 'production' ? 
    'https://nr-task-manager-api.herokuapp.com' 
    : 
    'http://localhost:3001';