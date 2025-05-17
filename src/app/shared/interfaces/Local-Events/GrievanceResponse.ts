import { Address } from '../address/address';
import { SarpanchResponse } from '../sarpanch/sarpanch-response';

export interface LocalEventResponse {
  id: string;
  createdBy: SarpanchResponse; // Define Sarpanch interface separately
  name: string;
  descriptions: string;
  location: Address; // Define Address interface separately
  startDate: string; // LocalDate as ISO string
  endDate: string; // LocalDate as ISO string
}
