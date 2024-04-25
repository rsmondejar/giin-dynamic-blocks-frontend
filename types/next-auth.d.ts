import {UserBasicInfo} from "@/interfaces/user-basic-info.interface";
import {User} from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }

    interface User extends UserBasicInfo{}
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: User;
    }
}
