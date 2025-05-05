import { PaginationRequest } from "../pagination-request";

export interface SarpanchFilter extends PaginationRequest {
    gramPanchayat?: string;
    gender?: string;
    minAge?: number | null;
    maxAge?: number | null;
    minElectionYear?: number | null;
    maxElectionYear?: number | null;
    isActive?: boolean | null;
}
