import React, { useState } from "react";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle your login logic here
		alert(`Email: ${email}\nPassword: ${password}`);
	};

	return (
		<div className="h-[75vh] flex items-center justify-center">
			<div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Admin Login
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium mb-1">
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">
							Password
						</label>
						<input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Your password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[var(--color-purple)] text-white py-2 rounded hover:opacity-95 cursor-pointer transition"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
