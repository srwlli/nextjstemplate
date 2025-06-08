'use client';

import { useState } from 'react';
import { signInWithEmail, signInWithOAuth } from '@/lib/auth-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await signInWithEmail(formData);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    const result = await signInWithOAuth(provider);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Log In</h1>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <Button
            onClick={() => handleOAuthSignIn('google')}
            variant="outline"
            className="w-full bg-red-600 text-white hover:bg-red-700 hover:text-white"
            disabled={loading}
          >
            Sign In with Google
          </Button>
          <Button
            onClick={() => handleOAuthSignIn('github')}
            variant="outline"
            className="w-full bg-gray-700 text-white hover:bg-gray-800 hover:text-white"
            disabled={loading}
          >
            Sign In with GitHub
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
} 