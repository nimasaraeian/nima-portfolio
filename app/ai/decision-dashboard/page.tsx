'use client';

import DashboardCard from "@/components/DashboardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from "recharts";

const monthlyData = [
  { month: "Jan", value: 180 },
  { month: "Feb", value: 320 },
  { month: "Mar", value: 260 },
  { month: "Apr", value: 520 },
  { month: "May", value: 300 },
  { month: "Jun", value: 410 },
];

const barData = [
  { label: "A", value: 420 },
  { label: "B", value: 360 },
  { label: "C", value: 510 },
  { label: "D", value: 280 },
  { label: "E", value: 610 },
  { label: "F", value: 190 },
  { label: "G", value: 340 },
];

const factorData = [
  { label: "Clarity", value: 72 },
  { label: "Trust Signals", value: 54 },
  { label: "Motivation", value: 63 },
  { label: "Emotional Safety", value: 48 },
  { label: "Cognitive Load", value: 35 },
];

const radialData = [{ name: "Health", value: 75, fill: "#22c55e" }];

const smallKpiData = [
  { label: "Cognitive Friction", value: 55 },
  { label: "Emotional Resistance", value: 70 },
  { label: "Trust & Clarity", value: 65 },
  { label: "Action Triggers", value: 45 },
];

export default function DecisionDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:px-6 lg:py-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Dashboard
            </p>
            <h1 className="text-xl font-semibold text-slate-50">
              Decision Psychology Report
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-300 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>AI Analysis Active</span>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <DashboardCard
            title="Decision Friction Over Time"
            subtitle="Monthly friction trend for this landing page or campaign."
            className="lg:col-span-2"
          >
            <div className="mt-2 h-56 w-full">
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#64748b" tickLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: "#22d3ee" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Psychological Signal Distribution"
            subtitle="How key cognitive & emotional signals are activated."
          >
            <div className="mt-2 h-56 w-full">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="label" stroke="#64748b" tickLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    fill="url(#barGradient)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <DashboardCard
            title="Key Decision Factors"
            subtitle="Relative strength of the most important psychological levers."
            className="lg:col-span-2"
          >
            <div className="mt-2 space-y-3">
              {factorData.map((factor) => (
                <div key={factor.label}>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>{factor.label}</span>
                    <span className="font-medium">{factor.value}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-cyan-400"
                      style={{ width: `${factor.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Overall Decision Health"
            subtitle="Summary KPI for this page."
          >
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="h-40 w-40">
                <ResponsiveContainer>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={12}
                    data={radialData}
                    startAngle={220}
                    endAngle={-40}
                  >
                    <RadialBar
                      dataKey="value"
                      minAngle={15}
                      background
                      clockWise
                      cornerRadius={5}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="-mt-20 text-center">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Decision Health
                </div>
                <div className="text-2xl font-bold text-slate-50">75%</div>
              </div>
            </div>
          </DashboardCard>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {smallKpiData.map((kpi) => (
            <DashboardCard key={kpi.label} title={kpi.label}>
              <div className="space-y-2">
                <div className="text-2xl font-semibold text-slate-50">
                  {kpi.value}
                  <span className="text-sm text-slate-500"> / 100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800">
                  <div
                    className="h-1.5 rounded-full bg-sky-400"
                    style={{ width: `${kpi.value}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Short one-line explanation for this KPI.
                </p>
              </div>
            </DashboardCard>
          ))}
        </section>
      </main>
    </div>
  );
}

