export { default } from "next-auth/middleware";

export async function middleware() {
	// const token = await getToken({ req: request });
	// const url = request.nextUrl;
	// const isPublicPath =
	// 	url.pathname.startsWith("/login") ||
	// 	url.pathname.startsWith("/signup") ||
	// 	url.pathname.startsWith("/captcha");

	

	

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
