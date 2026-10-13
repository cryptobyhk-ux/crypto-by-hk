export type EmployeeStatus = "active" | "inactive";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string; // YYYY-MM-DD
  salary: number; // monthly, PKR
  status: EmployeeStatus;
}

export type AttendanceStatus = "present" | "late" | "absent" | "half" | "leave";

export type CheckInMethod = "Manual" | "Face ID";

export interface AttendanceRecord {
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn?: string; // HH:MM
  checkOut?: string; // HH:MM
  method?: CheckInMethod;
}

export type LeaveType = "Annual" | "Sick" | "Casual" | "Unpaid";
export type LeaveStatus = "pending" | "approved" | "rejected";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  reason: string;
  status: LeaveStatus;
  createdAt: string; // ISO
}

export interface Department {
  id: string;
  name: string;
}

export interface HRState {
  employees: Employee[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  departments: Department[];
  paidPayrolls: string[]; // month prefixes "YYYY-MM" marked as paid
}
