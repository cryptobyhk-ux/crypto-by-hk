import type { Department, Employee } from "./types";

export const seedDepartments: Department[] = [
  { id: "d-eng", name: "Engineering" },
  { id: "d-sales", name: "Sales" },
  { id: "d-marketing", name: "Marketing" },
  { id: "d-hr", name: "Human Resources" },
  { id: "d-finance", name: "Finance" },
  { id: "d-support", name: "Support" },
];

export const seedEmployees: Employee[] = [
  { id: "e-001", name: "Ahmed Raza", email: "ahmed.raza@company.com", phone: "0301-1234567", department: "Engineering", designation: "Senior Developer", joinDate: "2022-03-14", salary: 180000, status: "active" },
  { id: "e-002", name: "Fatima Khan", email: "fatima.khan@company.com", phone: "0321-2345678", department: "Human Resources", designation: "HR Manager", joinDate: "2021-07-01", salary: 150000, status: "active" },
  { id: "e-003", name: "Bilal Hussain", email: "bilal.hussain@company.com", phone: "0333-3456789", department: "Sales", designation: "Sales Executive", joinDate: "2023-01-10", salary: 95000, status: "active" },
  { id: "e-004", name: "Ayesha Malik", email: "ayesha.malik@company.com", phone: "0345-4567890", department: "Marketing", designation: "Content Strategist", joinDate: "2022-11-21", salary: 110000, status: "active" },
  { id: "e-005", name: "Usman Tariq", email: "usman.tariq@company.com", phone: "0300-5678901", department: "Engineering", designation: "Frontend Developer", joinDate: "2023-06-05", salary: 140000, status: "active" },
  { id: "e-006", name: "Sana Iqbal", email: "sana.iqbal@company.com", phone: "0322-6789012", department: "Finance", designation: "Accountant", joinDate: "2021-09-15", salary: 125000, status: "active" },
  { id: "e-007", name: "Danish Ali", email: "danish.ali@company.com", phone: "0346-7890123", department: "Support", designation: "Support Agent", joinDate: "2024-02-12", salary: 75000, status: "active" },
  { id: "e-008", name: "Hira Shahid", email: "hira.shahid@company.com", phone: "0302-8901234", department: "Sales", designation: "Sales Manager", joinDate: "2020-05-20", salary: 165000, status: "active" },
  { id: "e-009", name: "Kamran Sheikh", email: "kamran.sheikh@company.com", phone: "0321-9012345", department: "Engineering", designation: "DevOps Engineer", joinDate: "2023-09-01", salary: 155000, status: "active" },
  { id: "e-010", name: "Mahnoor Asif", email: "mahnoor.asif@company.com", phone: "0334-0123456", department: "Marketing", designation: "SEO Specialist", joinDate: "2024-04-08", salary: 90000, status: "active" },
  { id: "e-011", name: "Faisal Mehmood", email: "faisal.mehmood@company.com", phone: "0300-1122334", department: "Finance", designation: "Finance Officer", joinDate: "2022-12-01", salary: 105000, status: "inactive" },
  { id: "e-012", name: "Zainab Qureshi", email: "zainab.qureshi@company.com", phone: "0345-2233445", department: "Support", designation: "Team Lead", joinDate: "2021-04-18", salary: 115000, status: "active" },
];
