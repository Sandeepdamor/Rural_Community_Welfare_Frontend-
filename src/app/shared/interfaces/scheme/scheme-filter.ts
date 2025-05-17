import { PaginationRequest } from "../pagination-request";

export interface SchemeFilter extends PaginationRequest {
    category?: string;
    status?:string;
    gramPanchayatName?:string;
    createdBy?: string | null;
    isActive?:boolean|null;
    isDeleted?:boolean|null;
}
