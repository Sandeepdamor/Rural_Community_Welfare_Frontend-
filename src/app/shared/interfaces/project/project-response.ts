import { ProjectProgress } from "../../../enums/project-progress.enum";
import { SarpanchAssignProjectRequest } from "./sarpanch-assign-project-request";

export interface ProjectResponse {
    id: string;
    projectName: string;
    description: string;
    assignedSarpanches: SarpanchAssignProjectRequest[]; // Array to handle multiple assigned Sarpanches
    budget: number;
    startDate: string; // ISO string representation of date
    endDate: string;   // ISO string representation of date
    approvalStatus: string;  // Can be replaced with enum
    progressStatus: ProjectProgress;
    createdBy: string; // ID of the creator
    approvedBy: string; // ID of the approver
    approvedDate: string; // ISO string representation of date
    attachmenets: string[]; // List of attachment URLs
    isDeleted: boolean;
    isActive: boolean;
    createdAt: string; // ISO string representation of date
    updatedAt: string; // ISO string representation of date
  }