export interface SarpanchRequest {
    name: string;
    fatherOrHusbandName: string;
    dateOfBirth: string; // 'yyyy-MM-dd' format
    age: number;
    gender: string;
    phone: string;
    aadharNumber: string;
    addressId: string;
    houseNumber?: string;
    gramPanchayatName: string;
    wardNumber?: string;
    electionYear: number;
    termStartDate: string; // 'yyyy-MM-dd' format
    termEndDate: string;   // 'yyyy-MM-dd' format
    villageIds: string[];
  }