export interface SchemeResponse {
    id: string;
    name: string;
    category: string;
    createdBy:string;
    criteria: string;
    process: string;
    benefits: string;
    status: string;
    isDeleted: boolean| null;
    isActive: boolean | null;
    createdAt: string;
    updatedAt: string;
    attachments: string[];
    existingAttachmentUrls: string[];
  }
  