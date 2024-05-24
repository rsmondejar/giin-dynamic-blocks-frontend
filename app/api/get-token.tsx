import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";


export const getUserToken = async () => {
    const session = await getServerSession(authOptions);
    return session?.user?.token?.Authorization ?? null;
}
