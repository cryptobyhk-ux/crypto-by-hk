"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useHR } from "@/lib/store";
import { Avatar, Card, EmptyState } from "@/components/ui";
import { todayISO } from "@/lib/utils";

type Phase = "idle" | "starting" | "scanning" | "matched";

export default function KioskPage() {
  const { employees, attendance, markAttendance } = useHR();
  const [employeeId, setEmployeeId] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = useMemo(() => employees.filter((e) => e.status === "active"), [employees]);
  const today = todayISO();

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch {
        setCameraError("Camera not available — you can still run a simulated scan below.");
      }
    })();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const alreadyMarked = employeeId
    ? attendance.some((a) => a.date === today && a.employeeId === employeeId)
    : false;

  const startScan = () => {
    if (!employeeId) {
      alert("Select an employee first.");
      return;
    }
    setPhase("starting");
    timerRef.current = setTimeout(() => setPhase("scanning"), 600);
    timerRef.current = setTimeout(() => {
      const now = new Date();
      const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      markAttendance(today, employeeId, {
        status: t > "09:30" ? "late" : "present",
        checkIn: t,
        method: "Face ID",
      });
      setPhase("matched");
    }, 2600);
  };

  const reset = () => {
    setPhase("idle");
    setEmployeeId("");
  };

  const emp = employees.find((e) => e.id === employeeId);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">📷 CAM 01 — Office Entrance</h3>
            <p className="text-xs text-slate-500">Face-verification check-in kiosk (demo mode)</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" /> LIVE
          </span>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-slate-900">
          {cameraError ? (
            <div className="flex h-64 items-center justify-center p-6 text-center text-sm text-slate-400">
              {cameraError}
            </div>
          ) : (
            <video ref={videoRef} muted playsInline className="h-64 w-full object-cover sm:h-80" />
          )}

          {/* overlays */}
          {phase === "scanning" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 animate-ping rounded-full border-4 border-emerald-400 opacity-60" />
              <div className="absolute h-48 w-48 rounded-full border-4 border-emerald-400" />
              <span className="absolute bottom-4 rounded-full bg-black/60 px-4 py-1 text-sm font-semibold text-white">
                Scanning face…
              </span>
            </div>
          )}
          {phase === "matched" && emp && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/90 p-6 text-center">
              <span className="mb-2 text-5xl">✅</span>
              <p className="text-xl font-extrabold text-white">Face Verified</p>
              <p className="mt-1 font-semibold text-white">{emp.name}</p>
              <p className="text-sm text-emerald-100">
                {emp.department} · Checked in at{" "}
                {attendance.find((a) => a.date === today && a.employeeId === emp.id)?.checkIn}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            disabled={phase === "scanning" || phase === "starting"}
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">Select employee to verify…</option>
            {active.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} — {e.department}
              </option>
            ))}
          </select>
          {phase === "idle" || phase === "starting" ? (
            <button
              onClick={startScan}
              disabled={phase === "starting"}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {phase === "starting" ? "Initializing camera…" : "🔍 Start Face Scan"}
            </button>
          ) : (
            <button
              onClick={reset}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Scan next person ↺
            </button>
          )}
        </div>

        {alreadyMarked && phase === "idle" && employeeId && (
          <p className="mt-2 text-xs font-semibold text-amber-600">
            ⚠ This employee already checked in today — scanning again will update the time.
          </p>
        )}
      </Card>

      <Card>
        <h3 className="mb-3 font-bold text-slate-900">Today's Kiosk Check-ins</h3>
        {(() => {
          const kioskRecs = attendance.filter((a) => a.date === today && a.method === "Face ID");
          if (kioskRecs.length === 0)
            return <EmptyState text="No face-verified check-ins yet today." />;
          return (
            <div className="space-y-2">
              {kioskRecs.map((a) => {
                const e = employees.find((x) => x.id === a.employeeId);
                return (
                  <div key={a.employeeId} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
                    <Avatar name={e?.name ?? "?"} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{e?.name}</p>
                      <p className="text-xs text-slate-500">{e?.department}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{a.checkIn}</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {a.status}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </Card>

      <p className="text-center text-xs text-slate-400">
        Demo kiosk: face matching is simulated for demonstration. In production this connects to a
        biometric verification service.
      </p>
    </div>
  );
}
