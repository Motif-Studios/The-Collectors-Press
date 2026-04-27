"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/features/auth/lib/client";


export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ passwordCheck, setPasswordCheck ] = useState("");
  const [  errorMessage, setErrorMessage ] = useState<string>("");
  const [  successCheckMessage, setSuccess ] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if(password !== passwordCheck) {
      setErrorMessage("Passwords do not match. Please check and try again.");
      return;
    }

    try {
      setLoading(true);
      const response = await signup(email, password);

      console.log("Signup response:", response);

      if (response.error) {
        setErrorMessage("Signup failed: " + response.error);
        return;
      }

      setSuccess(true);
      router.push("/"); // Redirect to homepage after successful signup

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
            Join now
          </p>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
            Create your account
          </h1>

          <p className="mb-8 text-sm leading-6 text-[#6c7680] sm:text-[15px]">
            Sign up to save stories, manage your profile, and subscribe later with ease.
          </p>

          { 
            errorMessage ? (
              <p className="mb-8 text-sm leading-6 text-[#ff4d4f] sm:text-[15px]">
                {errorMessage}
              </p>
            ) 
          : 
            null
          }

          <div className="space-y-4 text-left">
            <label className="block text-sm font-medium text-[#111]" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
            />

            <label className="block text-sm font-medium text-[#111]" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
            />

            <label className="block text-sm font-medium text-[#111]" htmlFor="signup-password-check">
              Confirm Password
            </label>
            <input
              id="signup-password-check"
              type="password"
              placeholder="Confirm your password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              autoComplete="new-password"
              className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
            />
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>

          <p className="mt-6 text-sm text-[#6c7680]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#111] underline underline-offset-4 hover:text-[#3fa0cf]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}