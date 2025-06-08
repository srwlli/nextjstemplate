'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deletePost(postId: string): Promise<{ success?: boolean; error?: string }> {
  if (!postId) {
    return { error: 'Post ID is required for deletion.' };
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    // Revalidate the /posts path to reflect the deletion
    revalidatePath('/posts');
    revalidatePath('/user-dashboard/my-posts'); // Also revalidate user's specific posts page if applicable

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting post ${postId}:`, error);
    if (error.code === 'P2025') { // Prisma specific error code for record not found
      return { error: 'Post not found.' };
    }
    return { error: `Failed to delete post: ${error.message || 'Unknown error'}` };
  }
} 