import { supabase } from "../../../lib/supabase/client";
import { createStripeCustomer } from "../queries/createStripeCustomer";
import { createSubscriber } from "../queries/createSubscriber";
import { newProfile } from "../queries/newProfile";

export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }

    console.log("Login successful:", data);

    return { user: data.user, session: data.session };
};

export const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("Signup error:", error);
        return { error: error.message };
    }

    console.log("Signup successful:", data);

    const stripeCustomerData = await createStripeCustomer(email);
    if (stripeCustomerData?.error || !stripeCustomerData?.id) {
        return { error: stripeCustomerData?.error ?? "Failed to create subscription customer" };
    }

    const newProfileData = await newProfile(data.user?.id);
    if (newProfileData?.error) {
        return { error: newProfileData.error };
    }

    const newSubscriberData = await createSubscriber(data.user?.id, email, stripeCustomerData.id);
    if (newSubscriberData?.error) {
        return { error: newSubscriberData.error };
    }
    
    return { user: data.user, session: data.session, subscription: newSubscriberData, profile: newProfileData };
}

export const logout = async () => {    
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        return { error: error.message };
    }

    console.log("User logged out");

    return { message: "Logged out successfully" };
}

export const forgotPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset_password`,
    });

    if (error) {
        console.error("Forgot password error:", error);
        return { error: error.message };
    }

    console.log("Forgot password email sent:", data);
    return { message: "Password reset email sent" };
}

export const resetPassword = async (newPassword: string) => {
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        console.error("Reset password error:", updateError);
        return { error: updateError.message };
    }

    console.log("Password reset successful:", updateData);
    return { user: updateData.user };
}