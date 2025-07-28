import { AnnouncementStatus } from '../../../enums/announcement-status.enum';
import { PaginationRequest } from '../pagination-request';

export interface AnnouncementSearch extends PaginationRequest {
  search: string;
}
