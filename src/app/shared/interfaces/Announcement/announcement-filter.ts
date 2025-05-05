import { AnnouncementStatus } from '../../../enums/announcement-status.enum';
import { PaginationRequest } from '../pagination-request';

export interface AnnouncementFilter extends PaginationRequest {
  isActive?: boolean | null;
  status?: AnnouncementStatus | null;
}
