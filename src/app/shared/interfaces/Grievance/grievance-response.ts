import { Address } from '../address/address';
import { Resident } from './Resident ';

export interface GrievanceResponse {
  id: string;
  phone: string;
  subject: string;
  description: string;
  address: Address; // You can define Address separately
  attachments: string[];
  submittedDate: string; // LocalDate as ISO string
  status: string; // Enum as string
  response: string;
  resident: Resident;
}
