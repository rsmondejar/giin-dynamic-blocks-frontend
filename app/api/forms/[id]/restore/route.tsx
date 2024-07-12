import {NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";
import {getUserToken} from "@/app/api/get-token";

export const PUT = async (
    request: Request,
    {params}: { params: { id: string } }
) => {
    try {
        const id: string = params.id
        const token: string | null = await getUserToken();

        const response: Response = await fetch(`${BACKEND_URL}/forms/${id}/restore`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const res = await response.json();

        if (response.status !== 200) {
            throw new Error(JSON.stringify(res?.message) ?? '');
        }

        return NextResponse.json(res, {status: response.status});
    } catch (error: any) {
        return NextResponse.json({
            errors: error.message,
        });
    }
}
