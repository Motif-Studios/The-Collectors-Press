"use client";

import React from "react";
import { forgotPassword } from "@/features/auth/lib/client";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";

export function ForgotPasswordForm() {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { showSuccess, showError, clearMessage } = useLogoutFeedback();

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            clearMessage();
            const response = await forgotPassword(email);
            console.log("Forgot password response:", response);

            if (response.error) {
                showError(`Failed to send reset email: ${response.error}`);
                return;
            }
            showSuccess("Password reset email sent.");

        } catch (err) {
            console.error(err);
            showError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:py-14">
            <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
                <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
                    Forgot your password?
                </p>

                <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                    Enter your email to reset your password.
                </h1>

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
                </div>

                <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Continue"}
                </button>

                <p className="mt-6 text-sm text-[#6c7680]">
                    Didn’t get the email? Check your spam folder and try again.
                </p>
                </div>
            </div>
        </div>


    );
}