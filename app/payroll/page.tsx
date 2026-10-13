"use client";

import { useMemo, useState } from "react";
import { useHR } from "@/lib/store";
import { Avatar, Badge, Card, EmptyState, Modal, StatCard, btnGhost, btnPrimary } from "@/components/ui";
import { formatDate, formatPKR } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface SlipRow {
  id: string;
  name: string;
  designation: string;
  department: string;
  basic: number;
  present: number;
  absent: number;
  late: number;
  allowance: number;
  deduction: number;
  net: number;
}

export default function PayrollPage() {
  const { employees, attendance, paidPayrolls, togglePayrollPaid } = useHR();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [slip, setSlip] = useState<SlipRow | null>(null);

  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const isPaid = paidPayrolls.includes(prefix);

  const rows: SlipRow[] = useMemo(() => {
    return employees
      .filter((e) => e.status === "active" && e.salary > 0)
      .map((e) => {
        const recs = attendance.filter((a) => a.employeeId === e.id && a.date.startsWith(prefix));
        const present = recs.filter((a) => a.status === "present" || a.status === "half").length;
        const absent = recs.filter((a) => a.status === "absent").length;
        const late = recs.filter((a) => a.status === "late").length;
        const perDay = e.salary / 30;
        const allowance = Math.round(e.salary * 0.1);
        const deduction = Math.round(perDay * absent + (perDay / 2) * late);
        return {
          id: e.id, name: e.name, designation: e.designation, department: e.department,
          basic: e.salary, present, absent, late, allowance, deduction,
          net: e.salary + allowance - deduction,
        };
      });
  }, [employees, attendance, prefix]);

  const totals = useMemo(() => {
    return rows.reduce(
      (t, r) => ({
        gross: t.gross + r.basic + r.allowance,
        deduction: t.deduction + r.deduction,
        net: t.net + r.net,
      }),
      { gross: 0, deduction: 0, net: 0 }
    );
  }, [rows]);

  const years = useMemo(() => {
    const y = now.getFullYear();
    return [y - 1, y, y + 1];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Gross Payroll Base" value={formatPKR(totals.gross)} tone="indigo" sub={`${MONTHS[month]} ${year} · incl. 10% allowance`} />
        <StatCard label="Attendance Penalties" value={formatPKR(totals.deduction)} tone="rose" sub="Absent & late deductions" />
        <StatCard label="Net Payroll Payable" value={formatPKR(totals.net)} tone="emerald" sub={`${rows.length} employees`} />
      </div>

      <Card className="!p-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <Badge tone={isPaid ? "emerald" : "amber"}>{isPaid ? "✓ Paid" : "Unpaid"}</Badge>
          <button
            onClick={() => togglePayrollPaid(prefix)}
            className={`ml-auto rounded-lg px-4 py-2 text-sm font-semibold text-white ${
              isPaid ? "bg-slate-500 hover:bg-slate-600" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isPaid ? "Mark as Unpaid" : "✓ Mark Month as Paid"}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Auto-generated from attendance: full-day cut per absent day, half-day cut per late arrival. Mark attendance to keep payroll accurate.
        </p>
      </Card>

      {rows.length === 0 ? (
        <EmptyState text="No active employees with salary set." />
      ) : (
        <Card className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Base Salary</th>
                  <th className="px-4 py-3">P / A / L</th>
                  <th className="px-4 py-3">Allowance</th>
                  <th className="px-4 py-3">Deduction</th>
                  <th className="px-4 py-3">Net Pay</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={r.name} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900">{r.name}</p>
                          <p className="text-xs text-slate-500">{r.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.department}</td>
                    <td className="px-4 py-3">{formatPKR(r.basic)}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-emerald-600">{r.present}</span>
                      <span className="text-slate-400"> / </span>
                      <span className="font-semibold text-rose-600">{r.absent}</span>
                      <span className="text-slate-400"> / </span>
                      <span className="font-semibold text-amber-600">{r.late}</span>
                    </td>
                    <td className="px-4 py-3 text-emerald-700">+ {formatPKR(r.allowance)}</td>
                    <td className="px-4 py-3 text-rose-600">− {formatPKR(r.deduction)}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{formatPKR(r.net)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSlip(r)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        View Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {slip && (
        <Modal title={`Payslip — ${MONTHS[month]} ${year}`} onClose={() => setSlip(null)}>
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-lg font-extrabold text-slate-900">PeopleDesk</p>
                <p className="text-xs text-slate-500">Salary Slip · {isPaid ? "PAID" : "UNPAID"}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>{MONTHS[month]} {year}</p>
                <p>Generated {formatDate(new Date().toISOString().slice(0, 10))}</p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <p className="text-slate-500">Employee</p><p className="font-semibold text-slate-900">{slip.name}</p>
              <p className="text-slate-500">Designation</p><p className="text-slate-900">{slip.designation}</p>
              <p className="text-slate-500">Department</p><p className="text-slate-900">{slip.department}</p>
              <p className="text-slate-500">Attendance</p>
              <p className="text-slate-900">{slip.present} present · {slip.absent} absent · {slip.late} late</p>
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Basic Salary</span><span className="font-medium">{formatPKR(slip.basic)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Allowance (10%)</span><span className="font-medium text-emerald-700">+ {formatPKR(slip.allowance)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Attendance Deduction</span><span className="font-medium text-rose-600">− {formatPKR(slip.deduction)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold">
                <span>Net Pay</span><span className="text-emerald-700">{formatPKR(slip.net)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className={btnGhost} onClick={() => setSlip(null)}>Close</button>
            <button className={btnPrimary} onClick={() => window.print()}>🖨 Print Slip</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
