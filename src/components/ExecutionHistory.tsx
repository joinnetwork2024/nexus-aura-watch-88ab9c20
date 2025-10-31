import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { n8nApi } from "@/services/n8nApi";
import { formatDistanceToNow } from "date-fns";

export const ExecutionHistory = () => {
  const { data: executions = [], isLoading } = useQuery({
    queryKey: ['n8n-executions'],
    queryFn: n8nApi.getExecutions,
    refetchInterval: 5000,
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['n8n-workflows'],
    queryFn: n8nApi.getWorkflows,
  });

  const getWorkflowName = (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    return workflow?.name || 'Unknown Workflow';
  };

  const getDuration = (startedAt: string, stoppedAt: string) => {
    if (!stoppedAt) return "...";
    const duration = new Date(stoppedAt).getTime() - new Date(startedAt).getTime();
    return `${(duration / 1000).toFixed(1)}s`;
  };

  const recentExecutions = executions.slice(0, 5);
  return (
    <Card className="bg-card/50 backdrop-blur-sm p-6 cyber-border">
      <h2 className="text-xl font-bold text-primary mb-6 text-glow">RECENT EXECUTIONS</h2>
      {isLoading ? (
        <p className="text-muted-foreground">Loading executions...</p>
      ) : recentExecutions.length === 0 ? (
        <p className="text-muted-foreground">No executions found</p>
      ) : (
        <div className="space-y-3">
          {recentExecutions.map((execution) => (
            <div 
              key={execution.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-4">
                {execution.status === "success" && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
                {execution.status === "error" && (
                  <XCircle className="w-5 h-5 text-error" />
                )}
                {execution.status === "running" && (
                  <Clock className="w-5 h-5 text-warning animate-pulse" />
                )}
                {execution.status === "waiting" && (
                  <Clock className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">{getWorkflowName(execution.workflowId)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  execution.status === "success" ? "text-success" :
                  execution.status === "error" ? "text-error" :
                  "text-warning"
                }`}>
                  {execution.status.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getDuration(execution.startedAt, execution.stoppedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
