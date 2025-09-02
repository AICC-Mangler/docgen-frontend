export interface Notice {
  id: number;
  title: string;
  content: string;
  created_date_time: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
}

export interface UpdateNoticeRequest {
  id: number;
  title: string;
  content: string;
}

export interface NoticeResponse {
  success: boolean;
  data?: Notice | Notice[];
  message?: string;
}
