import { getN8nApiUrl } from '@/config/n8n';
import { N8N_CONFIG } from '@/config/n8n';

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface N8nExecution {
  id: string;
  workflowId: string;
  finished: boolean;
  mode: string;
  startedAt: string;
  stoppedAt: string;
  status: 'success' | 'error' | 'running' | 'waiting';
}

export const n8nApi = {
  async getWorkflows(): Promise<N8nWorkflow[]> {
    try {
      console.log('Fetching workflows from:', getN8nApiUrl('/workflows'));
      const response = await fetch(getN8nApiUrl('/workflows'), {
        headers: {
          'X-N8N-API-KEY': N8N_CONFIG.apiKey,
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch workflows:', errorText);
        throw new Error(`Failed to fetch workflows: ${response.status}`);
      }
      const data = await response.json();
      console.log('Workflows data:', data);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  },

  async getExecutions(): Promise<N8nExecution[]> {
    try {
      console.log('Fetching executions from:', getN8nApiUrl('/executions'));
      const response = await fetch(getN8nApiUrl('/executions'), {
        headers: {
          'X-N8N-API-KEY': N8N_CONFIG.apiKey,
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch executions:', errorText);
        throw new Error(`Failed to fetch executions: ${response.status}`);
      }
      const data = await response.json();
      console.log('Executions data:', data);
      return data.data || [];
    } catch (error) {
      console.error('Error fetching executions:', error);
      throw error;
    }
  },

  async getWorkflowExecutions(workflowId: string): Promise<N8nExecution[]> {
    const response = await fetch(getN8nApiUrl(`/executions?workflowId=${workflowId}`), {
      headers: {
        'X-N8N-API-KEY': N8N_CONFIG.apiKey,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch workflow executions');
    const data = await response.json();
    return data.data || [];
  },
};
