import { TableColumn } from "./table-column";

export interface TableConfig {
    columns: TableColumn[];
    data: any[];
    actions: string[]; // e.g., ['edit', 'delete']
    totalRecords?: number;
}
