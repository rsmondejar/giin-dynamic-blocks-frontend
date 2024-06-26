import {NextRequest, NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";
import {getUserToken} from "@/app/api/get-token";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const token: string | null = await getUserToken();

    if (!token) {
        return NextResponse.json({
            errors: 'Unauthorized',
        }, {status: 401});
    }

    try {
        const formCreateResponse: Response = await fetch(`${BACKEND_URL}/forms`, {
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

        return NextResponse.json(response, {status: formCreateResponse.status});
    } catch (error: any) {
        return NextResponse.json({
            errors: error.message,
        });
    }
}
