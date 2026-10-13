"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AttendanceRecord,
  AttendanceStatus,
  Department,
  Employee,
  HRState,
  LeaveRequest,
  LeaveStatus,
} from "./types";
import { seedDepartments, seedEmployees } from "./seed";

const STORAGE_KEY = "peopledesk-hrms-v1";

const emptyState: HRState = {
  employees: [],
  attendance: [],
  leaves: [],
  departments: [],
  paidPayrolls: [],
};

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function loadState(): HRState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<HRState>;
      if (Array.isArray(parsed.employees) && parsed.employees.length > 0) {
        return { ...emptyState, ...parsed };
      }
    }
  } catch {
    /* fall through to seed */
  }
  return {
    employees: seedEmployees,
    attendance: [],
    leaves: [],
    departments: seedDepartments,
    paidPayrolls: [],
  };
}

interface HRContextValue extends HRState {
  ready: boolean;
  addEmployee: (e: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  markAttendance: (
    date: string,
    employeeId: string,
    patch: Partial<Omit<AttendanceRecord, "date" | "employeeId">> & { status: AttendanceStatus }
  ) => void;
  addLeave: (l: Omit<LeaveRequest, "id" | "createdAt" | "status">) => void;
  setLeaveStatus: (id: string, status: LeaveStatus) => void;
  addDepartment: (name: string) => void;
  deleteDepartment: (id: string) => void;
  togglePayrollPaid: (monthPrefix: string) => void;
  resetDemo: () => void;
}

const HRContext = createContext<HRContextValue | null>(null);

export function HRProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HRState>(() => emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, ready]);

  const addEmployee = useCallback((e: Omit<Employee, "id">) => {
    setState((s) => ({ ...s, employees: [...s.employees, { ...e, id: uid("e") }] }));
  }, []);

  const updateEmployee = useCallback((id: string, patch: Partial<Employee>) => {
    setState((s) => ({
      ...s,
      employees: s.employees.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      employees: s.employees.filter((e) => e.id !== id),
      attendance: s.attendance.filter((a) => a.employeeId !== id),
      leaves: s.leaves.filter((l) => l.employeeId !== id),
    }));
  }, []);

  const markAttendance = useCallback(
    (
      date: string,
      employeeId: string,
      patch: Partial<Omit<AttendanceRecord, "date" | "employeeId">> & {
        status: AttendanceStatus;
      }
    ) => {
      setState((s) => {
        const rest = s.attendance.filter(
          (a) => !(a.date === date && a.employeeId === employeeId)
        );
        return {
          ...s,
          attendance: [...rest, { date, employeeId, ...patch }],
        };
      });
    },
    []
  );

  const addLeave = useCallback((l: Omit<LeaveRequest, "id" | "createdAt" | "status">) => {
    setState((s) => ({
      ...s,
      leaves: [
        { ...l, id: uid("lv"), createdAt: new Date().toISOString(), status: "pending" },
        ...s.leaves,
      ],
    }));
  }, []);

  const setLeaveStatus = useCallback((id: string, status: LeaveStatus) => {
    setState((s) => ({
      ...s,
      leaves: s.leaves.map((l) => (l.id === id ? { ...l, status } : l)),
    }));
  }, []);

  const addDepartment = useCallback((name: string) => {
    setState((s) =>
      s.departments.some((d) => d.name.toLowerCase() === name.toLowerCase())
        ? s
        : { ...s, departments: [...s.departments, { id: uid("d"), name }] }
    );
  }, []);

  const deleteDepartment = useCallback((id: string) => {
    setState((s) => {
      const dept = s.departments.find((d) => d.id === id);
      return {
        ...s,
        departments: s.departments.filter((d) => d.id !== id),
        employees: dept
          ? s.employees.map((e) =>
              e.department === dept.name ? { ...e, department: "Unassigned" } : e
            )
          : s.employees,
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState({
      employees: seedEmployees,
      attendance: [],
      leaves: [],
      departments: seedDepartments,
      paidPayrolls: [],
    });
  }, []);

  const togglePayrollPaid = useCallback((monthPrefix: string) => {
    setState((s) => ({
      ...s,
      paidPayrolls: s.paidPayrolls.includes(monthPrefix)
        ? s.paidPayrolls.filter((m) => m !== monthPrefix)
        : [...s.paidPayrolls, monthPrefix],
    }));
  }, []);

  const value = useMemo<HRContextValue>(
    () => ({
      ...state,
      ready,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      markAttendance,
      addLeave,
      setLeaveStatus,
      addDepartment,
      deleteDepartment,
      togglePayrollPaid,
      resetDemo,
    }),
    [
      state,
      ready,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      markAttendance,
      addLeave,
      setLeaveStatus,
      addDepartment,
      deleteDepartment,
      togglePayrollPaid,
      resetDemo,
    ]
  );

  return <HRContext.Provider value={value}>{children}</HRContext.Provider>;
}

export function useHR(): HRContextValue {
  const ctx = useContext(HRContext);
  if (!ctx) throw new Error("useHR must be used inside HRProvider");
  return ctx;
}
