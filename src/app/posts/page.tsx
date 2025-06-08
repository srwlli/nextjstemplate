import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import { Post, User } from '@prisma/client';

type PostWithAuthor = Post & {
  author: Pick<User, 'name' | 'email'> | null;
};

export const metadata: Metadata = {
  title: "All Blog Posts",
  description: "Explore all the latest blog posts and articles from our platform.",
  openGraph: {
    title: "All Blog Posts",
    description: "Explore all the latest blog posts and articles from our platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Blog Posts",
    description: "Explore all the latest blog posts and articles from our platform.",
  },
};

export default async function PostsPage() {
  // Fetch posts with author information
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: PostWithAuthor) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  By {post.author?.name || post.author?.email || 'Unknown Author'} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3 mb-4">{post.content}</p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <Link href={`/posts/${post.id}`} className="inline-block text-blue-600 hover:underline text-sm">
                  Read more &rarr;
                </Link>
                <DeleteButton id={post.id} itemName="post" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 