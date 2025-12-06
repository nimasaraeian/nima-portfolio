import React from "react";
import clsx from "clsx";

type DashboardCardProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  className,
  children,
}) => {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]",
        className
      )}
    >
      {(title || subtitle) && (
        <header className="mb-3 space-y-0.5">
          {title && (
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
};

export default DashboardCard;







