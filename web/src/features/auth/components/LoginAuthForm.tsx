"use client";

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
        const response =await login(email, password);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-6 space-y-4">
        
        <h1 className="text-xl font-semibold text-center">
          Sign in to your account
        </h1>

        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-200 rounded-md outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}