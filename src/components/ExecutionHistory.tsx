import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface Execution {
  id: string;
  workflow: string;
  status: "success" | "failed" | "running";
  timestamp: string;
  duration: string;
}

const mockExecutions: Execution[] = [
  { id: "1", workflow: "Data Processing Pipeline", status: "success", timestamp: "2 min ago", duration: "1.2s" },
  { id: "2", workflow: "Email Notification System", status: "success", timestamp: "5 min ago", duration: "0.8s" },
  { id: "3", workflow: "API Data Sync", status: "running", timestamp: "8 min ago", duration: "..." },
  { id: "4", workflow: "Backup Automation", status: "success", timestamp: "15 min ago", duration: "3.5s" },
  { id: "5", workflow: "Data Processing Pipeline", status: "failed", timestamp: "23 min ago", duration: "2.1s" },
];

export const ExecutionHistory = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm p-6 cyber-border">
      <h2 className="text-xl font-bold text-primary mb-6 text-glow">RECENT EXECUTIONS</h2>
      <div className="space-y-3">
        {mockExecutions.map((execution) => (
          <div 
            key={execution.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-4">
              {execution.status === "success" && (
                <CheckCircle2 className="w-5 h-5 text-success" />
              )}
              {execution.status === "failed" && (
                <XCircle className="w-5 h-5 text-error" />
              )}
              {execution.status === "running" && (
                <Clock className="w-5 h-5 text-warning animate-pulse" />
              )}
              <div>
                <p className="font-medium text-foreground">{execution.workflow}</p>
                <p className="text-sm text-muted-foreground">{execution.timestamp}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                execution.status === "success" ? "text-success" :
                execution.status === "failed" ? "text-error" :
                "text-warning"
              }`}>
                {execution.status.toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground">{execution.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
