"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/features/auth/lib/client";


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);

      console.log("Login response:", response);

      if (response.error) {
        alert("Login failed: " + response.error);
        return;
      }
    
      router.push("/"); // Redirect to homepage after successful login

      return response;

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
        <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
            Welcome back
          </p>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
            Sign in to your account
          </h1>

          <p className="mb-8 text-sm leading-6 text-[#6c7680] sm:text-[15px]">
            Enter your email and password to continue reading and managing your profile.
          </p>

          <div className="space-y-4 text-left">
            <label className="block text-sm font-medium text-[#111]" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
            />

            <label className="block text-sm font-medium text-[#111]" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Continue"}
          </button>

          <p className="mt-6 text-sm text-[#6c7680]">
            Don’t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#111] underline underline-offset-4 hover:text-[#3fa0cf]">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}