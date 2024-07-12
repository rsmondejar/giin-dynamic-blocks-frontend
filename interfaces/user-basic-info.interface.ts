import {AuthToken} from "@/interfaces/auth-token.interface";

export interface UserBasicInfo {
  id: string;
  email: string;
  name: string;
  lastName?: string | null;
  token?: AuthToken | null;
  isAdmin?: boolean;
  createdAt: Date;
}
