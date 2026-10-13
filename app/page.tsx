"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useHR } from "@/lib/store";
import { Avatar, Badge, Card, StatCard, EmptyState } from "@/components/ui";
import { daysBetween, formatDate, toISODate, todayISO } from "@/lib/utils";

function last7Days(): string[] {
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(toISODate(d));
  }
  return out;
}

export default function DashboardPage() {
  const { employees, attendance, leaves } = useHR();
  const today = todayISO();

  const stats = useMemo(() => {
    const active = employees.filter((e) => e.status === "active");
    const todayRecs = attendance.filter((a) => a.date === today);
    const present = todayRecs.filter((a) => a.status === "present" || a.status === "half").length;
    const late = todayRecs.filter((a) => a.status === "late").length;
    const absent = todayRecs.filter((a) => a.status === "absent").length;
    const onLeave = todayRecs.filter((a) => a.status === "leave").length;
    const pending = leaves.filter((l) => l.status === "pending").length;
    return { total: active.length, present, late, absent, onLeave, pending };
  }, [employees, attendance, leaves, today]);

  const week = useMemo(() => last7Days(), []);
  const weeklyData = useMemo(
    () =>
      week.map((date) => {
        const recs = attendance.filter((a) => a.date === date);
        const present = recs.filter(
          (a) => a.status === "present" || a.status === "half" || a.status === "late"
        ).length;
        return { date, present };
      }),
    [week, attendance]
  );
  const maxPresent = Math.max(1, ...weeklyData.map((d) => d.present));

  const deptData = useMemo(() => {
    const map = new Map<string, number>();
    employees
      .filter((e) => e.status === "active")
      .forEach((e) => map.set(e.department, (map.get(e.department) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [employees]);
  const maxDept = Math.max(1, ...deptData.map((d) => d[1]));

  const recentLeaves = useMemo(() => leaves.slice(0, 5), [leaves]);
  const upcomingTimeOff = useMemo(
    () =>
      leaves
        .filter((l) => l.status === "approved" && l.from >= today)
        .sort((a, b) => a.from.localeCompare(b.from))
        .slice(0, 5),
    [leaves, today]
  );
  const empName = (id: string) => employees.find((e) => e.id === id)?.name ?? "—";

  const leaveTone = (s: string) =>
    s === "approved" ? "emerald" : s === "rejected" ? "rose" : "amber";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Staff" value={stats.total} sub="Active employees" tone="indigo" />
        <StatCard label="Present Today" value={stats.present} sub={formatDate(today)} tone="emerald" />
        <StatCard label="Late Arrivals" value={stats.late} sub="After 09:30" tone="amber" />
        <StatCard label="Absent" value={stats.absent} sub="Not marked as leave" tone="rose" />
        <StatCard label="On Leave" value={stats.onLeave} sub="Approved time off" tone="sky" />
        <StatCard label="Pending Requests" value={stats.pending} sub="Leave approvals" tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Attendance Trends — Last 7 Days</h3>
            <Link href="/attendance" className="text-xs font-semibold text-indigo-600 hover:underline">
              Open register →
            </Link>
          </div>
          {weeklyData.every((d) => d.present === 0) ? (
            <EmptyState text="No attendance marked yet. Open the Attendance register and mark today's check-in to see the chart." />
          ) : (
            <div className="flex h-44 items-end gap-2">
              {weeklyData.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-bold text-slate-700">{d.present}</span>
                  <div
                    className="w-full rounded-t-lg bg-indigo-500/90 transition-all"
                    style={{ height: `${Math.max(6, (d.present / maxPresent) * 120)}px` }}
                    title={`${d.present} present on ${d.date}`}
                  />
                  <span className="text-[10px] text-slate-500">
                    {new Date(d.date + "T00:00:00").toLocaleDateString("en", { weekday: "short" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Team by Department</h3>
            <Link href="/departments" className="text-xs font-semibold text-indigo-600 hover:underline">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {deptData.length === 0 && <EmptyState text="No departments yet." />}
            {deptData.map(([name, count]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="font-bold text-slate-900">{count}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-emerald-500"
                    style={{ width: `${(count / maxDept) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Leave Requests</h3>
            <Link href="/leave" className="text-xs font-semibold text-indigo-600 hover:underline">
              View all →
            </Link>
          </div>
          {recentLeaves.length === 0 ? (
            <EmptyState text="No leave requests yet." />
          ) : (
            <div className="divide-y divide-slate-100">
              {recentLeaves.map((l) => (
                <div key={l.id} className="flex items-center gap-3 py-3">
                  <Avatar name={empName(l.employeeId)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {empName(l.employeeId)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {l.type} · {formatDate(l.from)} → {formatDate(l.to)} · {daysBetween(l.from, l.to)} day(s)
                    </p>
                  </div>
                  <Badge tone={leaveTone(l.status) as "emerald" | "rose" | "amber"}>
                    {l.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Upcoming Time Off</h3>
            <Link href="/leave" className="text-xs font-semibold text-indigo-600 hover:underline">
              Manage leaves →
            </Link>
          </div>
          {upcomingTimeOff.length === 0 ? (
            <EmptyState text="No approved upcoming leaves." />
          ) : (
            <div className="divide-y divide-slate-100">
              {upcomingTimeOff.map((l) => (
                <div key={l.id} className="flex items-center gap-3 py-3">
                  <Avatar name={empName(l.employeeId)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {empName(l.employeeId)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {l.type} · {formatDate(l.from)}
                      {l.to !== l.from ? ` → ${formatDate(l.to)}` : ""} · {daysBetween(l.from, l.to)} day(s)
                    </p>
                  </div>
                  <Badge tone="sky">{l.type}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
