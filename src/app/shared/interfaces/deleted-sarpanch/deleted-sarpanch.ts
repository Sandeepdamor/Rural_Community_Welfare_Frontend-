export interface DeletedSarpanchResponse {
    id: string;
    originalSarpanchId: string;
    name: string;
    phone: string;
    email: string;
    fatherOrHusbandName: string;
    dateOfBirth: string; // Use string for LocalDate
    age: number;
    gender: string;
    aadharNumber: string;
    gramPanchayatName: string;
    wardNumber: string;
    houseNumber: number;
    address: string;
    electionYear: number;
    termStartDate: string;
    termEndDate: string;
    villageSummaries: string[];
    deletedAt: string;
  }
  