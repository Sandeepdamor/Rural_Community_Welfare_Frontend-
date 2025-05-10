import { PaginationRequest } from '../pagination-request';

export interface GrievanceSearch extends PaginationRequest {
  search: string;
}
