import { PaginationRequest } from '../pagination-request';

export interface EventFilter extends PaginationRequest {
  isActive?: boolean | null;
  date?: {
    from?: Date | string | null;
    to?: Date | string | null;
  } | null;
}
