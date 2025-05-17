import { PaginationRequest } from '../pagination-request';

export interface EventSearch extends PaginationRequest {
  search: string;
}
