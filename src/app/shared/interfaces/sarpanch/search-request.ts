import { PaginationRequest } from "../pagination-request";

export interface SearchRequest extends PaginationRequest {
  keyword?: string;
  approvalStatus?:string;
  status?:string;
  isActive?:boolean|null;
  isDeleted?:boolean|null;
}
