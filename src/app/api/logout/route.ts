import { connectDb } from "@/database/db.config";
import { NextResponse } from "next/server";

connectDb();

export async function GET() {
	try {
		const response = NextResponse.json({
			message: "User logged out",
			success: true,
		});

		response.cookies.set("token", "", {
			httpOnly: true,
		});

		return response;
	} catch (error: unknown) {
    const message = typeof error === 'object' && error !== null && 'message' in error
        ? (error as Error).message
        : "An unknown error occurred";

    return NextResponse.json(
        { message },
        { status: 500 }
    );
}
}
