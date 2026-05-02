"use client";

import React from "react";
import { changeEmail } from "@/features/my_account/query/changeEmail";
import { supabase } from "@/lib/supabase/client";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ChangeEmailForm() {
    const [email, setEmail] = React.useState("");
    const [confirmEmail, setConfirmEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { showSuccess, showError, clearMessage } = useLogoutFeedback();

    const handleEmailChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearMessage();

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedConfirm = confirmEmail.trim().toLowerCase();

        if (!normalizedEmail) {
            showError("Email address is required.");
            return;
        }

        if (!EMAIL_REGEX.test(normalizedEmail)) {
            showError("Please enter a valid email address.");
            return;
        }

        if (!normalizedConfirm) {
            showError("Please confirm your new email address.");
            return;
        }

        if (normalizedEmail !== normalizedConfirm) {
            showError("Email addresses do not match. Please check and try again.");
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();
        const currentEmail = user?.email?.trim().toLowerCase();

        if (currentEmail && normalizedEmail === currentEmail) {
            showError("New email address must be different from your current email address.");
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            showError("Your session is no longer valid. Please log in again.");
            return;
        }


        try {
            setLoading(true);
            const response = await changeEmail(normalizedEmail);
            console.log("Change email response:", response);

            if (response.error) {
                showError(`Change email failed: ${response.error}`);
                return;
            }
            showSuccess("Email update request sent. Check both your old and new inboxes to confirm the change.");

            setTimeout(() => {
                window.location.replace("/my-account");
            }, 1500);

        } catch (err) {
            console.error(err);
            showError("An unexpected error occurred while updating your email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:py-14">
            <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
                <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
                    Change your email address
                </p>

                <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                    Enter your new email address.
                </h1>

                <form className="space-y-4 text-left" onSubmit={handleEmailChange} noValidate>
                    <label className="block text-sm font-medium text-[#111]" htmlFor="login-email">
                    New Email Address
                    </label>
                    <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your new email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    />

                    <label className="block text-sm font-medium text-[#111]" htmlFor="login-email-check">
                    Confirm Email Address
                    </label>
                    <input
                    id="login-email-check"
                    type="email"
                    placeholder="Confirm your new email address"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Continue"}
                    </button>
                </form>

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