import {NextResponse} from 'next/server'
import {BACKEND_URL} from "@/lib/Constants";
import {getUserToken} from "@/app/api/get-token";

export const GET = async (
    request: Request,
    {params}: { params: { id: string } }
) => {
    try {
        const id: string = params.id
        const token: string | null = await getUserToken();

        const response: Response = await fetch(`${BACKEND_URL}/forms/${id}/submissions/export/excel`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const blob: Blob = await response.blob();

        if (response.status !== 200) {
            throw new Error('Errror recibiendo fichero excel');
        }

        const headers = new Headers();

        headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return new NextResponse(blob, { status: 200, statusText: "OK", headers });

    } catch (error: any) {
        return NextResponse.json({
            errors: error.message,
        });
    }
}
