// src/lib/auth-actions.ts (Simplified signUpWithEmail function)
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'; // Keep this import for headers.get('origin')

export async function getUserSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }

  return session;
}

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  console.log('Attempting signup with email:', email);

  // Determine the site URL robustly
  const headersList = await headers(); // Use headersList instead of just headers()
  const origin = headersList.get('origin');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || origin || 'http://localhost:3000';
  console.log('Email redirect URL:', `${siteUrl}/auth/callback`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  console.log('Supabase signup raw response:', {
    data: data ? { user: data.user?.id, session: data.session?.user.id, email: data.user?.email } : null,
    error: error ? {
      message: error.message,
      status: error.status,
      name: error.name,
    } : null
  });

  // Case 1: Supabase explicitly returned an error (e.g., invalid email format, weak password)
  if (error) {
    console.log('Supabase returned an explicit error:', error);
    return { error: error.message };
  }

  // Case 2: No explicit error, but no new user created.
  // Given your privacy preference, this now defaults to a success message.
  // The 'if (!data.user)' check is removed as it would imply an explicit error.
  console.log('New user successfully created or email confirmation pending:', data.user?.id || 'N/A');
  return {
    success: true,
    message: 'Signup successful! Please check your email to confirm your account.'
  };
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return profile;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return { error: error.message };
  }

  redirect('/login');
}