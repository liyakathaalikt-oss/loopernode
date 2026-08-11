"use client";

import { useState } from "react";
import { signInAction } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 text-slate-200">
      <div className="w-full max-w-md p-8 glass rounded-2xl border border-white/10 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
            Loopernode CMS
          </h1>
          <p className="text-slate-400 mt-2">Sign in to manage content</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form
          action={async (formData) => {
            const res = await signInAction(formData);
            if (res?.error) {
              setError(res.error);
            }
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input 
              name="username" 
              type="text" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-primary-500/25"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
