import {UserBasicInfo} from "@/interfaces/user-basic-info.interface";
import {AuthToken} from "@/interfaces/auth-token.interface";

export default interface LoginResponse {
    success: boolean;
    message: string;
    statusCode?: number;
    data?: {
        user: UserBasicInfo | null;
        backendTokens: {
            accessToken: AuthToken;
            refreshToken: AuthToken;
        };
    };
}
