"use client";

import { useMemo, useState } from "react";
import { useHR } from "@/lib/store";
import {
  Avatar, Badge, Card, EmptyState, Modal, StatCard,
  btnGhost, btnPrimary, inputCls, labelCls,
} from "@/components/ui";
import { daysBetween, formatDate, todayISO } from "@/lib/utils";
import type { LeaveType } from "@/lib/types";

const LEAVE_TYPES: LeaveType[] = ["Annual", "Sick", "Casual", "Unpaid"];
const QUOTAS: Record<LeaveType, number> = { Annual: 14, Sick: 10, Casual: 7, Unpaid: 999 };

export default function LeavePage() {
  const { employees, leaves, addLeave, setLeaveStatus } = useHR();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [form, setForm] = useState({
    employeeId: "", type: "Annual" as LeaveType,
    from: todayISO(), to: todayISO(), reason: "",
  });

  const active = useMemo(() => employees.filter((e) => e.status === "active"), [employees]);
  const empName = (id: string) => employees.find((e) => e.id === id)?.name ?? "—";

  const filtered = useMemo(
    () => leaves.filter((l) => filter === "all" || l.status === filter),
    [leaves, filter]
  );

  // company-wide usage per leave type (approved only)
  const typeUsage = useMemo(() => {
    const used: Record<LeaveType, number> = { Annual: 0, Sick: 0, Casual: 0, Unpaid: 0 };
    leaves
      .filter((l) => l.status === "approved")
      .forEach((l) => { used[l.type] += daysBetween(l.from, l.to); });
    return used;
  }, [leaves]);

  const pendingCount = useMemo(() => leaves.filter((l) => l.status === "pending").length, [leaves]);

  const balances = useMemo(() => {
    const used = new Map<string, number>();
    leaves
      .filter((l) => l.status === "approved" && l.type === "Annual")
      .forEach((l) => used.set(l.employeeId, (used.get(l.employeeId) ?? 0) + daysBetween(l.from, l.to)));
    return active.map((e) => ({
      emp: e,
      used: used.get(e.id) ?? 0,
      left: Math.max(0, QUOTAS.Annual - (used.get(e.id) ?? 0)),
    }));
  }, [active, leaves]);

  const submit = () => {
    if (!form.employeeId) { alert("Select an employee."); return; }
    if (form.to < form.from) { alert("End date cannot be before start date."); return; }
    if (!form.reason.trim()) { alert("Please add a reason."); return; }
    addLeave({
      employeeId: form.employeeId,
      type: form.type,
      from: form.from,
      to: form.to,
      reason: form.reason.trim(),
    });
    setShowForm(false);
    setForm({ employeeId: "", type: "Annual", from: todayISO(), to: todayISO(), reason: "" });
  };

  const tone = (s: string) => (s === "approved" ? "emerald" : s === "rejected" ? "rose" : "amber");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {(["Annual", "Sick", "Casual"] as LeaveType[]).map((t) => (
          <StatCard
            key={t}
            label={`${t} Leave Used`}
            value={`${typeUsage[t]} days`}
            sub={`Quota ${QUOTAS[t]} days / employee / year`}
            tone={t === "Annual" ? "indigo" : t === "Sick" ? "rose" : "sky"}
          />
        ))}
        <StatCard label="Pending Requests" value={pendingCount} sub="Awaiting approval" tone="amber" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-1.5">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize ${
                filter === f ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className={`${btnPrimary} sm:ml-auto`} onClick={() => setShowForm(true)}>
          + New Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {filtered.length === 0 ? (
            <EmptyState text="No leave requests in this view." />
          ) : (
            filtered.map((l) => (
              <Card key={l.id} className="!p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={empName(l.employeeId)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{empName(l.employeeId)}</p>
                      <Badge tone="indigo">{l.type}</Badge>
                      <Badge tone={tone(l.status) as "emerald" | "rose" | "amber"}>{l.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(l.from)} → {formatDate(l.to)} · {daysBetween(l.from, l.to)} day(s)
                    </p>
                    <p className="mt-1 text-sm text-slate-700">“{l.reason}”</p>
                  </div>
                  {l.status === "pending" && (
                    <div className="flex shrink-0 gap-1.5">
                      <button
                        onClick={() => setLeaveStatus(l.id, "approved")}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setLeaveStatus(l.id, "rejected")}
                        className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <Card className="h-fit">
          <h3 className="mb-1 font-bold text-slate-900">Annual Leave Balance</h3>
          <p className="mb-3 text-xs text-slate-500">Quota: {QUOTAS.Annual} days / year</p>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {balances.map(({ emp, used, left }) => (
              <div key={emp.id} className="flex items-center gap-2 text-sm">
                <Avatar name={emp.name} size="sm" />
                <span className="min-w-0 flex-1 truncate font-medium text-slate-700">{emp.name}</span>
                <span className="text-xs text-slate-500">{used} used</span>
                <Badge tone={left > 5 ? "emerald" : left > 0 ? "amber" : "rose"}>{left} left</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {showForm && (
        <Modal title="New Leave Request" onClose={() => setShowForm(false)}>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Employee *</label>
              <select className={inputCls} value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
                <option value="">Select employee…</option>
                {active.map((e) => <option key={e.id} value={e.id}>{e.name} — {e.department}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Leave type</label>
              <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LeaveType })}>
                {LEAVE_TYPES.map((t) => <option key={t} value={t}>{t} ({QUOTAS[t] >= 999 ? "unlimited" : QUOTAS[t] + " days/yr"})</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>From</label><input type="date" className={inputCls} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></div>
              <div><label className={labelCls}>To</label><input type="date" className={inputCls} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></div>
            </div>
            <div><label className={labelCls}>Reason *</label><textarea className={inputCls} rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="e.g. Family wedding in Lahore" /></div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button className={btnGhost} onClick={() => setShowForm(false)}>Cancel</button>
            <button className={btnPrimary} onClick={submit}>Submit Request</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
