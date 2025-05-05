import { AadharStatus } from "../../../enums/aadhar-status.enum";
import { PaginationRequest } from "../pagination-request";


export interface ResidentFilter extends PaginationRequest {
  gramPanchayat?: string;
  gender?: string;
  minAge?: number | null;
  maxAge?: number | null;
  isActive?: boolean | null;
  aadharStatus?: AadharStatus | string;
}
