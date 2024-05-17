import {NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";

export const GET = async (
    request: Request,
    {params}: { params: { slug: string } }
) => {
    try {
        const slug: string = params.slug

        const response: Response = await fetch(`${BACKEND_URL}/forms/find-by-slug/${slug}`, {
            method: 'GET',
            headers: {
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
