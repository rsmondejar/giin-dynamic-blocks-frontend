import { NextResponse } from 'next/server'
import { BACKEND_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const body = await request.json();
    const session = await getServerSession(authOptions);
    const token = session?.user?.token?.Authorization ?? null;

    try {
        // send form to backend
        const formCreateResponse = await fetch(`${BACKEND_URL}/forms`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const response = await formCreateResponse.json();

        if (formCreateResponse.status !== 201) {
            throw new Error(JSON.stringify(response?.message) ?? '');
        }

        return NextResponse.json(response,{ status: formCreateResponse.status });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            errors: error.message,
        });
    }
}
