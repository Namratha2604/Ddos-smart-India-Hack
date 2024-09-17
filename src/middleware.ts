import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
import { connectDb } from "./database/db.config";
import DataSet from "./models/dataset.model";
import axios from "axios";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;
	const isPublicPath =
		url.pathname.startsWith("/login") ||
		url.pathname.startsWith("/signup") ||
		url.pathname.startsWith("/captcha");


	

	// await DataSet.create({ip, protocol, currentTime,})

	// if (token && isPublicPath) {
	// 	return NextResponse.redirect(new URL("/", request.url));
	// }
	// if (!token && !isPublicPath) {
	// 	return NextResponse.redirect(new URL("/login", request.url));
	// }
}

export const config = {
	matcher: ["/", "/home", "/login", "/signup", "/captcha", "/verify"],
};
