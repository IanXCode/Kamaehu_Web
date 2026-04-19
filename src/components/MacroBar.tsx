"use client";

import { useEffect, useState } from "react";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
}

export default function MacroBar({ label, current, target, color }: MacroBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentage = Math.min((current / target) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-foreground-muted">{label}</span>
        <span className="font-medium text-foreground">
          {current}g / {target}g
        </span>
      </div>
      <div className="h-2 bg-foreground-muted/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
