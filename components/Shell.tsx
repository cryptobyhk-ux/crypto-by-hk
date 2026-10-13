"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useHR } from "@/lib/store";
import { todayISO } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Dashboard", icon: "▦" },
  { href: "/employees", label: "Employees", icon: "◉" },
  { href: "/attendance", label: "Attendance", icon: "✓" },
  { href: "/kiosk", label: "Face Kiosk", icon: "📷" },
  { href: "/leave", label: "Leave", icon: "✈" },
  { href: "/payroll", label: "Payroll", icon: "₨" },
  { href: "/reports", label: "Reports", icon: "📊" },
  { href: "/departments", label: "Departments", icon: "▤" },
];

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  "/": { title: "Dashboard", sub: "Company overview at a glance" },
  "/employees": { title: "Employees", sub: "Manage your team records" },
  "/attendance": { title: "Attendance", sub: "Daily check-in & attendance ledger" },
  "/kiosk": { title: "Face Kiosk", sub: "Face-verification check-in terminal" },
  "/leave": { title: "Leave Management", sub: "Requests, approvals & balances" },
  "/payroll": { title: "Payroll", sub: "Monthly salary processing" },
  "/reports": { title: "Reports & Analytics", sub: "Punctuality & verification insights" },
  "/departments": { title: "Departments", sub: "Teams & structure" },
};

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { ready, resetDemo } = useHR();
  const meta = PAGE_TITLES[pathname] ?? PAGE_TITLES["/"];

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-900 text-slate-200">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-xl font-bold text-white">
          P
        </div>
        <div>
          <p className="text-lg font-bold text-white">PeopleDesk</p>
          <p className="text-xs text-slate-400">HR Management</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="w-5 text-center text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <button
          onClick={() => {
            if (confirm("Reset all data to demo defaults?")) resetDemo();
          }}
          className="w-full rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        >
          ↺ Reset demo data
        </button>
        <p className="mt-3 px-1 text-[11px] leading-relaxed text-slate-500">
          Demo workspace — data is stored in your browser only.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 lg:block">{sidebar}</aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                {meta.title}
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">{meta.sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:block">
                {todayISO()}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                HR
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          {!ready ? (
            <div className="flex h-64 items-center justify-center text-slate-400">
              Loading workspace…
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
