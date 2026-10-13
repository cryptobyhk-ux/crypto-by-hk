"use client";

import { useMemo, useState } from "react";
import { useHR } from "@/lib/store";
import {
  Avatar, Badge, Card, EmptyState, Modal,
  btnGhost, btnPrimary, inputCls, labelCls,
} from "@/components/ui";
import { formatDate, formatPKR } from "@/lib/utils";
import type { Employee as EmployeeType } from "@/lib/types";

const emptyForm = {
  name: "", email: "", phone: "", department: "",
  designation: "", joinDate: "", salary: "", status: "active" as "active" | "inactive",
};

export default function EmployeesPage() {
  const { employees, departments, addEmployee, updateEmployee, deleteEmployee } = useHR();
  const [q, setQ] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [modal, setModal] = useState<null | "add" | EmployeeType>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return employees.filter((e) => {
      const matchQ =
        !query ||
        e.name.toLowerCase().includes(query) ||
        e.designation.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query);
      const matchD = deptFilter === "all" || e.department === deptFilter;
      return matchQ && matchD;
    });
  }, [employees, q, deptFilter]);

  const openAdd = () => {
    setForm({ ...emptyForm, joinDate: new Date().toISOString().slice(0, 10) });
    setModal("add");
  };
  const openEdit = (e: EmployeeType) => {
    setForm({
      name: e.name, email: e.email, phone: e.phone, department: e.department,
      designation: e.designation, joinDate: e.joinDate,
      salary: String(e.salary), status: e.status,
    });
    setModal(e);
  };

  const save = () => {
    if (!form.name.trim() || !form.email.trim() || !form.department) {
      alert("Name, email and department are required.");
      return;
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      department: form.department,
      designation: form.designation.trim() || "—",
      joinDate: form.joinDate || new Date().toISOString().slice(0, 10),
      salary: Number(form.salary) || 0,
      status: form.status,
    };
    if (modal === "add") addEmployee(payload);
    else if (modal) updateEmployee(modal.id, payload);
    setModal(null);
  };

  const deptList = useMemo(
    () => [...new Set(employees.map((e) => e.department))].sort(),
    [employees]
  );

  return (
    <div className="space-y-4">
      <Card className="!p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className={inputCls}
            placeholder="Search name, designation, email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className={`${inputCls} sm:w-56`}
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="all">All departments</option>
            {deptList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button className={`${btnPrimary} whitespace-nowrap`} onClick={openAdd}>
            + Add Employee
          </button>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState text="No employees found. Add your first team member with the button above." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <Card key={e.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={e.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{e.name}</p>
                  <p className="truncate text-xs text-slate-500">{e.designation}</p>
                </div>
                <Badge tone={e.status === "active" ? "emerald" : "slate"}>{e.status}</Badge>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <p>🏢 {e.department}</p>
                <p>✉️ {e.email}</p>
                <p>📞 {e.phone || "—"}</p>
                <p>📅 Joined {formatDate(e.joinDate)}</p>
                <p className="text-sm font-bold text-slate-900">💰 {formatPKR(e.salary)}/mo</p>
              </div>
              <div className="mt-auto flex gap-2 pt-1">
                <button className={`${btnGhost} flex-1 !py-1.5`} onClick={() => openEdit(e)}>
                  Edit
                </button>
                <button
                  className="flex-1 rounded-lg border border-rose-200 px-4 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                  onClick={() => {
                    if (confirm(`Delete ${e.name}? This also removes their attendance & leave records.`))
                      deleteEmployee(e.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "add" ? "Add Employee" : `Edit — ${(modal as EmployeeType).name}`} onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div><label className={labelCls}>Full name *</label><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className={labelCls}>Email *</label><input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className={labelCls}>Phone</label><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><label className={labelCls}>Designation</label><input className={inputCls} value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} /></div>
            <div>
              <label className={labelCls}>Department *</label>
              <select className={inputCls} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                <option value="">Select…</option>
                {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Join date</label><input type="date" className={inputCls} value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })} /></div>
            <div><label className={labelCls}>Monthly salary (PKR)</label><input type="number" min={0} className={inputCls} value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button className={btnGhost} onClick={() => setModal(null)}>Cancel</button>
            <button className={btnPrimary} onClick={save}>Save Employee</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
