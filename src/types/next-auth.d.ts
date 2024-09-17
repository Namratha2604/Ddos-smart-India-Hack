import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		_id?: String;
		username?: String;
	}
	interface Session {
		user: {
			_id?: String;
			username?: String;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: String;
		username?: String;
	}
}
