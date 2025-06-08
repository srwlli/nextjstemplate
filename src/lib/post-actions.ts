'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPosts() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        author:profiles (
          id,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    console.error('Error in getPosts:', error);
    return { error: 'Failed to fetch posts' };
  }
}

export async function createPost(formData: FormData) {
  const content = formData.get('content') as string;
  const authorId = formData.get('authorId') as string;

  if (!content || !authorId) {
    return { error: 'Content and author ID are required' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        content,
        author_id: authorId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error.message);
    return { error: error.message };
  }

  // Revalidate the posts and user dashboard pages
  revalidatePath('/posts');
  revalidatePath('/user-dashboard/my-posts');

  return { data };
} 