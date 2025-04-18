export interface TableColumn {
    name: string;
  displayName: string;
  type: 'text' | 'image' | 'status' | 'action' | 'checkbox' | 'documents'|'toggle' | 'serial' | 'aadharstatus' | 'delete-status';
  sortable?: boolean;
  width?: string;
}

