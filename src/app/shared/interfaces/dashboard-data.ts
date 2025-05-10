export interface DashboardData {
  totalUsers: number;
  totalVerifiedUsers: number;
  totalPendingUsers: number;
  totalRejectedUsers: number;
  totalInActiveUsers: number;
  genderDistribution: { [key: string]: number };
  projects: string[];
  announcements: string[];
  schemes: string[];
}
