import { PaginationRequest } from "../pagination-request";

export interface SearchRequest extends PaginationRequest {
  keyword?: string;
  approvalStatus?:string;
}