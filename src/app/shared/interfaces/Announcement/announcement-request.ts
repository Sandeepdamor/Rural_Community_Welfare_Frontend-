export interface AnnouncementRequest {
    id: string;
    title: string;
    content: string;
    date: string; 
    status: string;
    author: string;
    attachments: string[];
  }