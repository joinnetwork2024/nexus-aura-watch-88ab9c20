import { getN8nApiUrl } from '@/config/n8n';

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
    const response = await fetch(getN8nApiUrl('/workflows'));
    if (!response.ok) throw new Error('Failed to fetch workflows');
    const data = await response.json();
    return data.data || [];
  },

  async getExecutions(): Promise<N8nExecution[]> {
    const response = await fetch(getN8nApiUrl('/executions'));
    if (!response.ok) throw new Error('Failed to fetch executions');
    const data = await response.json();
    return data.data || [];
  },

  async getWorkflowExecutions(workflowId: string): Promise<N8nExecution[]> {
    const response = await fetch(getN8nApiUrl(`/executions?workflowId=${workflowId}`));
    if (!response.ok) throw new Error('Failed to fetch workflow executions');
    const data = await response.json();
    return data.data || [];
  },
};
