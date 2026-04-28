'use client';

/**
 * Sign In Page
 *
 * Allows users to sign in to manage their account.
 */

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">K</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Kamaehu</span>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="tribal-card shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-foreground-muted text-center mb-8">
            Sign in to manage your account
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-island disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground-muted text-sm">
              Don&apos;t have the app yet?{' '}
              <Link href="/#download" className="text-primary hover:underline font-medium">
                Download Kamaehu
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-foreground-muted hover:text-foreground text-sm inline-flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

function SignInLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">K</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Kamaehu</span>
          </div>
        </div>
        <div className="tribal-card shadow-xl flex items-center justify-center py-16">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm />
    </Suspense>
  );
}
