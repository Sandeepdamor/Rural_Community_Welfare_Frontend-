import { Address } from '../address/address';

export interface ResidentResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number | null;
  gender: string;
  aadharNumber: string;
  aadharVerificationStatus: string;
  address: Address;
  houseNumber: string;
  // appliedSchemes: Scheme[]; // Assuming Scheme is a defined interface/model
  isDeleted: boolean | null;
  isActive: boolean | null;
  createdAt: string; // Use string if it's serialized as ISO date from backend
  updatedAt: string;
  response:string;
  profileImage:string;
  isPublic:boolean;
}
