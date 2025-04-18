import { AadharStatus } from "../../../enums/aadhar-status.enum";
import { PaginationRequest } from "../pagination-request";


export interface ResidentSearch extends PaginationRequest {
  keyword?: string;
  aadharStatus?: AadharStatus | string;
  isDeleted?: boolean | null;
}
