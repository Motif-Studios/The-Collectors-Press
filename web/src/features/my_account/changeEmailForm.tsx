"use client";

import React from "react";
import { changeEmail } from "@/features/my_account/query/changeEmail";
import { supabase } from "@/lib/supabase/client";

export function ChangeEmailForm() {
    const [ email, setEmail] = React.useState(""); 
    const [ loading, setLoading ] = React.useState(false);
    const [ successCheckMessage, setSuccess ] = React.useState(false);
    const [ errorMessage, setErrorMessage ] = React.useState<string>("");

    const handleEmailChange = async () => {
        setErrorMessage("");

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            setErrorMessage("Your reset session is no longer valid. Please open the reset link from your email again.");
            return;
        }


        try {
            setLoading(true);
            const response = await changeEmail(email);
            console.log("Change email response:", response);

            if (response.error) {
                setErrorMessage("Change email failed: " + response.error);
                return;
            }
            setSuccess(true);

            setTimeout(() => {
                window.location.href = "/my-account"; // Redirect to login page after successful email change
            }, 1500); // Redirect after 1 second

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
                    Change your email address
                </p>

                <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                    Enter your new email address.
                </h1>

                { successCheckMessage ? (
                     <p className="mb-8 text-sm leading-6 text-[#00A82D] sm:text-[15px]">
                        Success! Please check both your old and new email inboxes for a confirmation email. Follow the instructions in the email to confirm your new email address. If you don't receive an email, please check your spam folder or try again.
                    </p>
                ) : (
                     <></>
                )}

                { errorMessage ? (
                    <p className="mb-8 text-sm leading-6 text-[#FF0000] sm:text-[15px]">
                        {errorMessage}
                    </p>
                ) : (
                    <></>
                )}

                <div className="space-y-4 text-left">
                    <label className="block text-sm font-medium text-[#111]" htmlFor="login-email">
                    New Email Address
                    </label>
                    <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your new email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    />

                    {/* <label className="block text-sm font-medium text-[#111]" htmlFor="login-password-check">
                    Confirm Email Address
                    </label>
                    <input
                    id="login-password-check"
                    type="password"
                    placeholder="Confirm your new password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    autoComplete="new-password"
                    className="h-14 w-full border-0 bg-[#ececec] px-4 text-base text-[#111] outline-none ring-1 ring-transparent transition placeholder:text-[#6c7680] focus:bg-white focus:ring-2 focus:ring-[#3fa0cf]/40"
                    /> */}
                </div>

                <button
                    onClick={handleEmailChange}
                    disabled={loading}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#3fa0cf] text-[15px] font-bold text-white transition hover:bg-[#3495c3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Continue"}
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