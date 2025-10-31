// n8n Workflow Monitor - Cyberpunk Dashboard
import { StatCard } from "@/components/StatCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import { ExecutionHistory } from "@/components/ExecutionHistory";
import { Activity, Zap, CheckCircle2, TrendingUp } from "lucide-react";

const Index = () => {
  const workflows = [
    { name: "Data Processing Pipeline", enabled: true, lastExecution: "2 min ago", executions: 1247, successRate: 98 },
    { name: "Email Notification System", enabled: true, lastExecution: "5 min ago", executions: 892, successRate: 95 },
    { name: "API Data Sync", enabled: true, lastExecution: "8 min ago", executions: 2341, successRate: 87 },
    { name: "Backup Automation", enabled: false, lastExecution: "2 hours ago", executions: 156, successRate: 72 },
  ];

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
            value={12}
            icon={Zap}
            trend="+2 this week"
            variant="default"
          />
          <StatCard 
            title="Active Workflows" 
            value={8}
            icon={Activity}
            trend="67% of total"
            variant="success"
          />
          <StatCard 
            title="Executions Today" 
            value="1.2K"
            icon={TrendingUp}
            trend="+18% from yesterday"
            variant="default"
          />
          <StatCard 
            title="Success Rate" 
            value="94%"
            icon={CheckCircle2}
            trend="Above target"
            variant="success"
          />
        </div>

        {/* Workflows Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4 text-glow">ACTIVE WORKFLOWS</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <WorkflowCard key={workflow.name} {...workflow} />
            ))}
          </div>
        </div>

        {/* Execution History */}
        <ExecutionHistory />
      </div>
    </div>
  );
};

export default Index;
