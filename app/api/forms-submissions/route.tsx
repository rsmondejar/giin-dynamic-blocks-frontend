import {NextRequest, NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    try {
        const formCreateResponse: Response = await fetch(`${BACKEND_URL}/forms-submissions`, {
            method: 'POST',
            headers: {
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
