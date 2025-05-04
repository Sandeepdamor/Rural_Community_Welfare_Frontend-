export interface TableColumn {
  name: string;
  displayName: string;
  type:
    | 'text'
    | 'image'
    | 'status'
    | 'action'
    | 'view-action'
    | 'checkbox'
    | 'documents'
    | 'toggle'
    | 'serial'
    | 'aadharstatus'
    | 'delete-status'
    | 'delete-announcement'
    | 'announcementStatus';
  sortable?: boolean;
  width?: string;
}
