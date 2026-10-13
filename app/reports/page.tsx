"use client";

import { useMemo } from "react";
import { useHR } from "@/lib/store";
import { Avatar, Badge, Card, EmptyState } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export default function ReportsPage() {
  const { employees, attendance } = useHR();

  const punctuality = useMemo(() => {
    const depts = [...new Set(employees.filter((e) => e.status === "active").map((e) => e.department))];
    return depts
      .map((dept) => {
        const ids = new Set(
          employees.filter((e) => e.department === dept && e.status === "active").map((e) => e.id)
        );
        const recs = attendance.filter((a) => ids.has(a.employeeId) && a.status !== "leave");
        const onTime = recs.filter((a) => a.status === "present").length;
        const late = recs.filter((a) => a.status === "late").length;
        const half = recs.filter((a) => a.status === "half").length;
        const absent = recs.filter((a) => a.status === "absent").length;
        const total = recs.length;
        const score = total === 0 ? 0 : Math.round(((onTime + half * 0.5) / total) * 100);
        return { dept, score, onTime, late, absent, total };
      })
      .sort((a, b) => b.score - a.score);
  }, [employees, attendance]);

  const log = useMemo(
    () =>
      [...attendance]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 25),
    [attendance]
  );
  const empName = (id: string) => employees.find((e) => e.id === id)?.name ?? "—";

  const maxScore = 100;

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-1 font-bold text-slate-900">Department Punctuality Index</h3>
        <p className="mb-4 text-xs text-slate-500">
          On-time check-ins as a share of all marked attendance (half days count 50%). Higher is better.
        </p>
        {punctuality.every((p) => p.total === 0) ? (
          <EmptyState text="No attendance data yet. Mark attendance to generate the punctuality index." />
        ) : (
          <div className="space-y-4">
            {punctuality.map((p) => (
              <div key={p.dept}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{p.dept}</span>
                  <span className="text-xs text-slate-500">
                    {p.onTime} on time · {p.late} late · {p.absent} absent
                  </span>
                  <span className={`font-extrabold ${p.score >= 80 ? "text-emerald-600" : p.score >= 60 ? "text-amber-600" : "text-rose-600"}`}>
                    {p.score}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className={`h-3 rounded-full transition-all ${p.score >= 80 ? "bg-emerald-500" : p.score >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                    style={{ width: `${(p.score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="!p-0 overflow-hidden">
        <h3 className="px-5 pt-5 font-bold text-slate-900">Verification Log</h3>
        <p className="px-5 pb-3 text-xs text-slate-500">Latest check-in records across all employees</p>
        {log.length === 0 ? (
          <div className="px-5 pb-5"><EmptyState text="No records yet." /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Check In</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {log.map((a, i) => (
                  <tr key={`${a.date}-${a.employeeId}-${i}`} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={empName(a.employeeId)} size="sm" />
                        <span className="font-medium text-slate-900">{empName(a.employeeId)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(a.date)}</td>
                    <td className="px-4 py-3 text-slate-600">{a.checkIn ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge tone={a.status === "present" ? "emerald" : a.status === "late" ? "amber" : a.status === "absent" ? "rose" : "sky"}>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{a.method === "Face ID" ? "📷 Face ID" : "✋ Manual"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
