# PeopleDesk — HR Management System

A complete, modern HR management web app: employee records, attendance tracking
with check-in/out times, a face-verification kiosk demo, leave management,
automatic payroll generation, and reports & analytics.

Built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.
Deploys cleanly on [Vercel](https://vercel.com).

## ✨ Features

- **📊 Dashboard** — total staff, present today, late arrivals, absentees, on-leave
  counts, 7-day attendance trend chart, department breakdown, recent leave
  requests and upcoming time off.
- **👥 Employees** — full directory with add / edit / delete, search and
  department filters, salary and join-date records.
- **✓ Attendance** — daily register with Present / Late / Half-day / Absent /
  Leave marking, check-in & check-out times, automatic late detection
  (after 09:30), CSV export and printable ledger.
- **📷 Face Kiosk** — demo face-verification check-in terminal (webcam +
  simulated face match) that auto-marks attendance.
- **✈ Leave** — leave requests with approve/reject workflow, per-type balance
  cards (Annual / Sick / Casual), pending counter and individual annual
  leave balances.
- **₨ Payroll** — month-wise salary sheet auto-generated from attendance:
  base salary, 10% allowance, absent & late deductions, net pay, printable
  payslips and Paid/Unpaid month tracking.
- **📊 Reports** — department punctuality index and a verification log of all
  check-ins.
- **▤ Departments** — team cards with headcount and monthly payroll totals.

> **Demo note:** all data is stored in the browser's `localStorage` — no
> backend or database needed. Use **Reset demo data** in the sidebar to
> restore the sample company.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build & deploy

```bash
npm run build
npm start
```

Push to GitHub and import the repository in Vercel — zero configuration needed.

## 🛠 Tech

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Client-side state with `localStorage` persistence
