"use client";

import { useMemo, useState } from "react";
import { useHR } from "@/lib/store";
import { Avatar, Badge, Card, StatCard, EmptyState } from "@/components/ui";
import { formatDate, todayISO } from "@/lib/utils";
import type { AttendanceRecord, AttendanceStatus } from "@/lib/types";

const STATUS_OPTS: { value: AttendanceStatus; label: string; cls: string }[] = [
  { value: "present", label: "Present", cls: "bg-emerald-600 text-white" },
  { value: "late", label: "Late", cls: "bg-orange-500 text-white" },
  { value: "half", label: "Half Day", cls: "bg-sky-600 text-white" },
  { value: "absent", label: "Absent", cls: "bg-rose-600 text-white" },
  { value: "leave", label: "Leave", cls: "bg-amber-500 text-white" },
];

const LATE_AFTER = "09:30";

function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AttendancePage() {
  const { employees, attendance, markAttendance } = useHR();
  const [date, setDate] = useState(todayISO());

  const active = useMemo(
    () => employees.filter((e) => e.status === "active"),
    [employees]
  );

  const recOf = (id: string): AttendanceRecord | undefined =>
    attendance.find((a) => a.date === date && a.employeeId === id);

  const counts = useMemo(() => {
    const recs = attendance.filter((a) => a.date === date);
    const c = (s: AttendanceStatus) => recs.filter((a) => a.status === s).length;
    return {
      present: c("present"),
      late: c("late"),
      half: c("half"),
      absent: c("absent"),
      leave: c("leave"),
      marked: recs.length,
    };
  }, [attendance, date]);

  const markAllPresent = () => {
    const t = nowTime();
    active.forEach((e) =>
      markAttendance(date, e.id, {
        status: t > LATE_AFTER ? "late" : "present",
        checkIn: t,
        method: "Manual",
      })
    );
  };

  const checkInNow = (id: string) => {
    const t = nowTime();
    markAttendance(date, id, {
      status: t > LATE_AFTER ? "late" : "present",
      checkIn: t,
      method: "Manual",
    });
  };

  const exportCSV = () => {
    const rows = [
      ["Date", "Employee", "Department", "Status", "Check In", "Check Out", "Method"],
      ...attendance
        .filter((a) => a.date === date)
        .map((a) => {
          const e = employees.find((x) => x.id === a.employeeId);
          return [
            a.date,
            e?.name ?? a.employeeId,
            e?.department ?? "",
            a.status,
            a.checkIn ?? "",
            a.checkOut ?? "",
            a.method ?? "",
          ];
        }),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const statusBadge = (s: AttendanceStatus | undefined) => {
    if (!s) return <Badge tone="slate">not marked</Badge>;
    const tone =
      s === "present" ? "emerald"
      : s === "late" ? "amber"
      : s === "half" ? "sky"
      : s === "absent" ? "rose"
      : "amber";
    return <Badge tone={tone as "emerald" | "amber" | "sky" | "rose"}>{s === "half" ? "half day" : s}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Present" value={counts.present} tone="emerald" />
        <StatCard label="Late Arrivals" value={counts.late} tone="amber" />
        <StatCard label="Half Day" value={counts.half} tone="sky" />
        <StatCard label="Absent" value={counts.absent} tone="rose" />
        <StatCard label="On Leave" value={counts.leave} tone="amber" />
        <StatCard label="Marked" value={`${counts.marked}/${active.length}`} tone="indigo" />
      </div>

      <Card className="!p-4 print:hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Date:</span>
            <input
              type="date"
              value={date}
              max={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-sm text-slate-500">
            {formatDate(date)} · Late after {LATE_AFTER}
          </span>
          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={exportCSV}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              ⬇ Export CSV
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              🖨 Print Ledger
            </button>
            <button
              onClick={markAllPresent}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              ✓ Mark all present
            </button>
          </div>
        </div>
      </Card>

      {active.length === 0 ? (
        <EmptyState text="No active employees. Add employees first." />
      ) : (
        <Card className="!p-0 overflow-hidden">
          <div className="hidden grid-cols-12 gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase text-slate-500 md:grid">
            <span className="col-span-4">Employee</span>
            <span className="col-span-4">Status</span>
            <span className="col-span-2">Check In</span>
            <span className="col-span-2">Check Out</span>
          </div>
          <div className="divide-y divide-slate-100">
            {active.map((e) => {
              const rec = recOf(e.id);
              return (
                <div key={e.id} className="grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-12 md:items-center md:gap-2">
                  <div className="flex min-w-0 items-center gap-3 md:col-span-4">
                    <Avatar name={e.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{e.name}</p>
                      <p className="text-xs text-slate-500">{e.department}</p>
                    </div>
                    <span className="ml-auto md:hidden">{statusBadge(rec?.status)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 md:col-span-4">
                    {STATUS_OPTS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => markAttendance(date, e.id, { status: o.value, method: rec?.method ?? "Manual" })}
                        className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                          rec?.status === o.value
                            ? o.cls
                            : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                    <button
                      onClick={() => checkInNow(e.id)}
                      title="Check in with current time"
                      className="rounded-lg border border-indigo-200 px-2 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      ⏱ Now
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="time"
                      value={rec?.checkIn ?? ""}
                      onChange={(ev) =>
                        markAttendance(date, e.id, {
                          status: ev.target.value > LATE_AFTER ? "late" : "present",
                          checkIn: ev.target.value,
                          method: rec?.method ?? "Manual",
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="time"
                      value={rec?.checkOut ?? ""}
                      onChange={(ev) =>
                        markAttendance(date, e.id, {
                          status: rec?.status ?? "present",
                          checkOut: ev.target.value,
                          method: rec?.method ?? "Manual",
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
