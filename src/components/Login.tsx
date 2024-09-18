"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


export function Login() {
	const {toast} = useToast();
  const router = useRouter(); 

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const user = Object.fromEntries(formData);

		if (user.email === "" || user.password === "") {
			toast({title: "Empty Fields"});
			return;
		}
		console.log(user);

		// const promise = axios.post("/api/users/login", user);
		const promise = await signIn("credentials", {
			email: user.email,
			password: user.password,
			redirect: false,
		});
		if (promise?.error) {
			toast({title: "Something went wrong"});
			return;
		}

		toast({title: "Logged in Successfully"})
		router.replace("/dashboard");
	}

  

	return (
		<div className="flex items-center justify-center min-h-screen">
		<div className="max-w-md w-full mx-auto p-4 md:p-8 bg-transparent  z-10 border rounded-2xl">
			<h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 text-center">
				Log In
			</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
				Please enter your credentials to log in to your account.
			</p>

			<form className="my-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						placeholder="john.doe69@gmail.com"
						type="email"
						name="email"
					/>
				</LabelInputContainer>
				<LabelInputContainer className="mb-8">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="••••••••"
						type="password"
						name="password"
					/>
				</LabelInputContainer>
				{/* <div className="captcha-box">
					<p>Click on any icon that appears the most number of times:</p>
					<div className="captcha-inline">
						{captchaOptions.counts.map((count, index) => (
						<button
							type="button"
							key={index}
							className="captcha-button"
							onClick={() => handleCaptchaClick(index)}
						>
							<span>{count}</span>
						</button>
						))}
					</div>
				</div> */}
				<button
					className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
				>
					Log In &rarr;
					<BottomGradient />
				</button>
			</form>

			<div className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
				Don&apos;t have an account <Link href={"/signup"} className="font-extrabold hover:underline">Sign Up</Link>
			</div>
		</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
