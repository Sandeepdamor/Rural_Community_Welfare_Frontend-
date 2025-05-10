import { ProjectApprovalStatus } from "../../../enums/project-approval-status";
import { ProjectProgress } from "../../../enums/project-progress.enum";
import { Role } from "../../../enums/role.enum";
import { PaginationRequest } from "../pagination-request";

export interface ProjectFilter extends PaginationRequest {
    gramPanchayat?: string;
    progressStatus?: ProjectProgress | '' | null;
    approvalStatus:  ProjectApprovalStatus;
    minBudget?: number | null;
    maxBudget?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    minApprovedDate?: string | null;
    maxApprovedDate?: string | null;
    createdBy?: string | null;
}
