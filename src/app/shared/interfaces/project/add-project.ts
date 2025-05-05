export interface AddProject {
    name: string;
    description: string;
    locationIds: string[];
    budget: string;
    startDate: string;
    endDate: string;
    attechmenets: File[];
}