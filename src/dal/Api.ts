import { mockFetch } from './mock-fetch';

export function getEmployees() {
  return mockFetch('/api/employees');
}

export function getWorklog() {
  return mockFetch('/api/employees/worklog');
}

export type EmployeesType = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  phone: string;
};

export type WorkLogType = {
  id: number;
  employee_id: number;
  from: string;
  to: string;
};
