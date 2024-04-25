export interface UserBasicInfo {
  id: string;
  email: string;
  name: string;
  lastName?: string | null;
  createdAt: Date;
}
