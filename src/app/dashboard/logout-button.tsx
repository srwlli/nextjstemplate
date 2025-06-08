'use client';

import { useState } from 'react';
import { signOut } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out', {
        description: 'Please try again or refresh the page.',
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      disabled={loading}
      className="text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Signing Out...' : 'Sign Out'}
    </Button>
  );
} 