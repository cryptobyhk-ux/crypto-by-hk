"use client";

import { useMemo, useState } from "react";
import { useHR } from "@/lib/store";
import { Card, EmptyState, btnPrimary, inputCls } from "@/components/ui";
import { formatPKR } from "@/lib/utils";

export default function DepartmentsPage() {
  const { employees, departments, addDepartment, deleteDepartment } = useHR();
  const [name, setName] = useState("");

  const cards = useMemo(() => {
    return departments.map((d) => {
      const members = employees.filter(
        (e) => e.department === d.name && e.status === "active"
      );
      const payroll = members.reduce((s, e) => s + e.salary, 0);
      return { dept: d, members, payroll };
    });
  }, [departments, employees]);

  const submit = () => {
    const n = name.trim();
    if (!n) return;
    addDepartment(n);
    setName("");
  };

  return (
    <div className="space-y-4">
      <Card className="!p-4">
        <div className="flex gap-2">
          <input
            className={inputCls}
            placeholder="New department name, e.g. Operations"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className={`${btnPrimary} whitespace-nowrap`} onClick={submit}>
            + Add
          </button>
        </div>
      </Card>

      {cards.length === 0 ? (
        <EmptyState text="No departments yet." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ dept, members, payroll }) => (
            <Card key={dept.id}>
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-xs text-slate-500">
                    {members.length} member{members.length === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete department "${dept.name}"? Its employees become Unassigned.`))
                      deleteDepartment(dept.id);
                  }}
                  className="rounded-lg px-2 py-1 text-lg text-slate-300 hover:bg-rose-50 hover:text-rose-500"
                  aria-label={`Delete ${dept.name}`}
                >
                  ×
                </button>
              </div>
              <div className="mb-3 flex -space-x-2">
                {members.slice(0, 6).map((m) => (
                  <div
                    key={m.id}
                    title={m.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-700"
                  >
                    {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                ))}
                {members.length > 6 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-bold text-slate-600">
                    +{members.length - 6}
                  </div>
                )}
                {members.length === 0 && (
                  <p className="text-xs text-slate-400">No members assigned</p>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-500">Monthly payroll</span>
                <span className="font-bold text-slate-900">{formatPKR(payroll)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
