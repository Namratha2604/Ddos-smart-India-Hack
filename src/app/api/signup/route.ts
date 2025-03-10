import bcryptjs from "bcryptjs";
import { connectDb } from "@/database/db.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json();
		console.log(reqBody);
		const { username, email, password } = reqBody;

		const existedUser = await User.findOne({ email });
		if (existedUser)
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);

		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		return NextResponse.json(
			{
				message: "User registered successfully",
				success: true,
				user,
			},
			{ status: 201 }
		);
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
