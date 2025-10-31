// n8n Workflow Monitor - Cyberpunk Dashboard
import { StatCard } from "@/components/StatCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import { ExecutionHistory } from "@/components/ExecutionHistory";
import { Activity, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { n8nApi } from "@/services/n8nApi";
import { useToast } from "@/hooks/use-toast";
import { N8N_CONFIG } from "@/config/n8n";

const Index = () => {
  const { toast } = useToast();

  const { data: workflows = [], isLoading, error: workflowError } = useQuery({
    queryKey: ['n8n-workflows'],
    queryFn: n8nApi.getWorkflows,
    refetchInterval: 10000, // Refresh every 10 seconds
    retry: 2,
  });

  const { data: executions = [], error: executionError } = useQuery({
    queryKey: ['n8n-executions'],
    queryFn: n8nApi.getExecutions,
    refetchInterval: 5000, // Refresh every 5 seconds
    retry: 2,
  });

  const activeWorkflows = Array.isArray(workflows) ? workflows.filter(w => w.active).length : 0;
  const totalWorkflows = Array.isArray(workflows) ? workflows.length : 0;
  const todayExecutions = Array.isArray(executions) ? executions.filter(e => {
    const today = new Date().toDateString();
    return new Date(e.startedAt).toDateString() === today;
  }).length : 0;
  const successRate = Array.isArray(executions) && executions.length > 0 
    ? Math.round((executions.filter(e => e.status === 'success').length / executions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary text-glow mb-2">
            n8n WORKFLOW MONITOR
          </h1>
          <p className="text-muted-foreground text-lg">Real-time workflow execution tracking</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Workflows" 
            value={totalWorkflows}
            icon={Zap}
            trend={isLoading ? "Loading..." : "Total workflows"}
            variant="default"
          />
          <StatCard 
            title="Active Workflows" 
            value={activeWorkflows}
            icon={Activity}
            trend={`${totalWorkflows > 0 ? Math.round((activeWorkflows / totalWorkflows) * 100) : 0}% of total`}
            variant="success"
          />
          <StatCard 
            title="Executions Today" 
            value={todayExecutions}
            icon={TrendingUp}
            trend="Today's runs"
            variant="default"
          />
          <StatCard 
            title="Success Rate" 
            value={`${successRate}%`}
            icon={CheckCircle2}
            trend={successRate >= 90 ? "Above target" : "Needs attention"}
            variant="success"
          />
        </div>

        {/* Workflows Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4 text-glow">ACTIVE WORKFLOWS</h2>
          {isLoading ? (
            <p className="text-muted-foreground">Loading workflows...</p>
          ) : workflowError ? (
            <div className="bg-error/10 border border-error p-4 rounded-lg">
              <p className="text-error font-semibold">Connection Error</p>
              <p className="text-muted-foreground text-sm mt-2">
                Failed to connect to n8n at {N8N_CONFIG.baseUrl}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Check browser console for details. This might be a CORS issue.
              </p>
            </div>
          ) : !Array.isArray(workflows) || workflows.length === 0 ? (
            <p className="text-muted-foreground">No workflows found at {N8N_CONFIG.baseUrl}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <WorkflowCard 
                  key={workflow.id} 
                  name={workflow.name}
                  enabled={workflow.active}
                  lastExecution={new Date(workflow.updatedAt).toLocaleString()}
                  executions={0}
                  successRate={0}
                />
              ))}
            </div>
          )}
        </div>

        {/* Execution History */}
        <ExecutionHistory />
      </div>
    </div>
  );
};

export default Index;
