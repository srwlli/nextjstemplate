import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Post, User } from '@prisma/client';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: { id },
    select: { 
      title: true, 
      content: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      openGraph: {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      },
      twitter: {
        card: "summary",
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      },
    };
  }

  const authorName = post.author?.name || post.author?.email || 'Unknown Author';
  const description = post.content 
    ? post.content.substring(0, 150) + '...' 
    : `Read more about ${post.title} by ${authorName}.`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: authorName,
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/posts" className="text-blue-600 hover:underline">
          &larr; Back to Posts
        </Link>
        <DeleteButton id={post.id} itemName="post" />
      </div>

      <article className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          By {post.author?.name || post.author?.email || 'Unknown Author'} on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
} 