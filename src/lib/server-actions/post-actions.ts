'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

interface ActionResponse {
  success?: boolean
  error?: string
}

export async function createPost(formData: FormData): Promise<ActionResponse> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const authorId = formData.get('authorId') as string

  if (!title || !content || !authorId) {
    return { error: 'Missing required fields' }
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    })

    revalidatePath('/posts')
    return { success: true }
  } catch (error: unknown) {
    console.error('Error creating post:', error)
    if (error instanceof Error) {
      return { error: `Failed to create post: ${error.message}` }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { error: 'A post with this title already exists' }
      }
    }
    return { error: 'Failed to create post: An unknown error occurred' }
  }
}

export async function deletePost(postId: string): Promise<ActionResponse> {
  if (!postId) {
    return { error: 'Post ID is required for deletion.' }
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    })

    // Revalidate the /posts path to reflect the deletion
    revalidatePath('/posts')
    revalidatePath('/user-dashboard/my-posts') // Also revalidate user's specific posts page if applicable

    return { success: true }
  } catch (error: unknown) {
    console.error(`Error deleting post ${postId}:`, error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { error: 'Post not found' }
      }
    }
    if (error instanceof Error) {
      return { error: `Failed to delete post: ${error.message}` }
    }
    return { error: 'Failed to delete post: An unknown error occurred' }
  }
}
