"use client";

import React, { useEffect } from "react";
import { resetPassword } from "@/features/auth/lib/client";
import { supabase } from "@/lib/supabase/client";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";

export function ResetPasswordForm() {
    const [password, setPassword] = React.useState("");
    const [ passwordCheck, setPasswordCheck ] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { showSuccess, showError, clearMessage } = useLogoutFeedback();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                console.log("Password recovery event detected:", event, session);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleResetPassword = async () => {
        clearMessage();

        if(password !== passwordCheck) {
            showError("Passwords do not match. Please check and try again.");
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            showError("Your reset session is no longer valid. Please open the reset link from your email again.");
            return;
        }


        try {
            setLoading(true);
            const response = await resetPassword(password);
            console.log("Reset password response:", response);

            if (response.error) {
                showError(`Reset password failed: ${response.error}`);
                return;
            }
            showSuccess("Password updated successfully.");

            setTimeout(() => {
                window.location.href = "/login"; // Redirect to login page after successful password reset
            }, 2000); // Redirect after 2 seconds

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
                    Reset your password
                </p>

                <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                    Enter your new password.
                </h1>

                <div className="space-y-4 text-left">
                    <label className="block text-sm font-medium text-[#111]" htmlFor="login-password">
                    Password
                    </label>
                    <input
                    id="login-password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    />

                    <label className="block text-sm font-medium text-[#111]" htmlFor="login-password-check">
                    Confirm Password
                    </label>
                    <input
                    id="login-password-check"
                    type="password"
                    placeholder="Confirm your new password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    />
                </div>

                <button
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                {/* <p className="mt-6 text-sm text-[#6c7680]">
                    Don’t have an account?{" "}
                    <Link href="/register" className="font-semibold text-[#111] underline underline-offset-4 hover:text-[#3fa0cf]">
                    Create one
                    </Link>
                </p> */}
                </div>
            </div>
        </div>


    );
}