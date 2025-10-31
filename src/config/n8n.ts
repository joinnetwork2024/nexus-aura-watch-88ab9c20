export const N8N_CONFIG = {
  baseUrl: 'http://10.43.58.226:5678',
  apiPath: '/api/v1',
};

export const getN8nApiUrl = (endpoint: string) => {
  return `${N8N_CONFIG.baseUrl}${N8N_CONFIG.apiPath}${endpoint}`;
};
