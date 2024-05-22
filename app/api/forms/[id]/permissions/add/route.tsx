import {NextRequest, NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";
import {getUserToken} from "@/app/api/get-token";

export const POST = async (
    req: NextRequest,
    {params}: { params: { id: string } }
) => {
    try {
        const id: string = params.id
        const body = await req.json();
        const token: string | null = await getUserToken();

        const formResponse: Response = await fetch(`${BACKEND_URL}/forms/${id}/permissions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const response = await formResponse.json();

        if (formResponse.status !== 201) {
            throw new Error(JSON.stringify(response?.message) ?? '');
        }

        return NextResponse.json(response, {status: formResponse.status});
    } catch (error: any) {
        return NextResponse.json({
            errors: error.message,
        });
    }
}
