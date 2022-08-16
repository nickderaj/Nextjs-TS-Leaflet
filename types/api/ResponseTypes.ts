export type ResponseData = {
  // JSON:API format
  id: string | number;
  type: string;
  data: object;
  message?: string;
  error?: any;
};
