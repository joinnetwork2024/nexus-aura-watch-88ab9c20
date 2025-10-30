import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

interface WorkflowCardProps {
  name: string;
  enabled: boolean;
  lastExecution: string;
  executions: number;
  successRate: number;
}

export const WorkflowCard = ({ name, enabled, lastExecution, executions, successRate }: WorkflowCardProps) => {
  const getStatusColor = (rate: number) => {
    if (rate >= 90) return "success";
    if (rate >= 70) return "warning";
    return "error";
  };

  const statusColor = getStatusColor(successRate);

  return (
    <Card className="bg-card/50 backdrop-blur-sm p-6 cyber-border hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-2">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last run: {lastExecution}</span>
          </div>
        </div>
        <Badge variant={enabled ? "default" : "secondary"} className={enabled ? "bg-success/20 text-success border-success" : ""}>
          {enabled ? "ACTIVE" : "DISABLED"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase">Executions</p>
          <p className="text-2xl font-bold text-primary">{executions}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase">Success Rate</p>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold text-${statusColor}`}>{successRate}%</p>
            {successRate >= 90 ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : successRate >= 70 ? (
              <Activity className="w-5 h-5 text-warning" />
            ) : (
              <XCircle className="w-5 h-5 text-error" />
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full bg-${statusColor} transition-all`}
          style={{ width: `${successRate}%` }}
        />
      </div>
    </Card>
  );
};
