import { AnnouncementResponse } from "./Announcement/announcement-response";
import { Project } from "./project/project";
import { SchemeResponse } from "./scheme/scheme-response";

export interface DashboardData {
  totalUsers: number;
  totalVerifiedUsers: number;
  totalPendingUsers: number;
  totalActiveUsers: number; // 👈 Add this
  totalRejectedUsers: number;
  totalInActiveUsers: number;
  totalProjects: number;
  totalGrivences: number;
  totalSchemes: number;
  genderDistribution: { [key: string]: number };
  projects: Project[];
  announcements: AnnouncementResponse[];
  schemes: SchemeResponse[];
}
