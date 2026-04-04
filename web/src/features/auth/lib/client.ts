import { supabase } from "../../../lib/supabase/client";

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

    return { user: data.user, session: data.session };
}

export const logout = async () => {    
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        return { error: error.message };
    }

    console.log("User logged out");
    window.location.href = "/"; // Redirect to homepage after logout

    return { message: "Logged out successfully" };
}
