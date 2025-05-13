import { Address } from "../address/address";

export interface SarpanchResponse {
  id: string;
  name: string;
  phone: string;
  email: string;
  aadharNumber: string;
  address: Address;
  age: number | null;
  gender: string;
  createdAt: string; // ISO string format from backend (e.g., '2025-04-19T12:34:56')
  updatedAt: string;
  isDeleted: boolean | null;
  isActive: boolean | null;
  fatherOrHusbandName: string;
  dateOfBirth: string; // Use string for LocalDate in TypeScript
  houseNumber: string;
  termEndDate: string;
  termStartDate: string;
  electionYear: number | null;
  gramPanchayatName: string;
  villages: Address[];
  deletedAt: string;
  profileImage: string;
}