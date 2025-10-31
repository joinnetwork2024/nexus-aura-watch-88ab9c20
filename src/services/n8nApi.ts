import { supabase } from '@/integrations/supabase/client';

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

const callN8nProxy = async (endpoint: string) => {
  const { data, error } = await supabase.functions.invoke('n8n-proxy', {
    body: { endpoint },
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Failed to call n8n proxy');
  }

  return data;
};

export const n8nApi = {
  async getWorkflows(): Promise<N8nWorkflow[]> {
    const data = await callN8nProxy('/api/v1/workflows');
    return data.data || [];
  },

  async getExecutions(): Promise<N8nExecution[]> {
    const data = await callN8nProxy('/api/v1/executions');
    return data.data || [];
  },

  async getWorkflowExecutions(workflowId: string): Promise<N8nExecution[]> {
    const data = await callN8nProxy(`/api/v1/executions?workflowId=${workflowId}`);
    return data.data || [];
  },
};
