export const N8N_CONFIG = {
  baseUrl: 'http://10.43.58.226:32299',
  apiPath: '/api/v1',
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTkzNzRlYS1mZjU0LTQ1YjQtYTdkOS0xZjU3N2QyMTE5YjAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYxODcwMTk1LCJleHAiOjE3NjQzOTI0MDB9.eUSqgLm7JuZrZgscYA-00OYgaqghEl-IyM72vYSAW6w',
};

export const getN8nApiUrl = (endpoint: string) => {
  return `${N8N_CONFIG.baseUrl}${N8N_CONFIG.apiPath}${endpoint}`;
};
