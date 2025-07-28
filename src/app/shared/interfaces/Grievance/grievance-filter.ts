import { GrievanceStatus } from './../../../enums/grievance-status';
import { PaginationRequest } from '../pagination-request';

export interface GrievanceFilter extends PaginationRequest {
  isActive?: boolean | null;
  status?: GrievanceStatus | null;
  date?: {
    from?: Date | string | null;
    to?: Date | string | null;
  } | null;
}
