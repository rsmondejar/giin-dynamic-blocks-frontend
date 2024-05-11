import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {BACKEND_URL} from "@/lib/Constants";
import {UserBasicInfo} from "@/interfaces/user-basic-info.interface";
import {AuthToken} from "@/interfaces/auth-token.interface";

interface LoginResponse {
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
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const res = await fetch(`${BACKEND_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })
                const response: LoginResponse = await res.json();

                // If no error and we have user data, return it
                if (response.success && response.data?.user) {
                    return response.data.user
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
    ],
    pages: {
        signIn: '/login', // '/auth/signin',
        // signOut: '/', // '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = user;
            }

            return token
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user = token.user;
            return session
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
