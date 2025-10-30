import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "warning" | "error";
}

export const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  const variantClasses = {
    default: "cyber-border",
    success: "border-success shadow-[0_0_15px_hsl(var(--success)/0.4)]",
    warning: "border-warning shadow-[0_0_15px_hsl(var(--warning)/0.4)]",
    error: "border-error shadow-[0_0_15px_hsl(var(--error)/0.4)]",
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm p-6 ${variantClasses[variant]} transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-glow">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className="p-3 rounded-lg bg-primary/10 cyber-glow">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
    </Card>
  );
};
