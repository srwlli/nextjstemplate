import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

interface PostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      authors: [post.author.name || ''],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/posts" className="text-blue-600 hover:underline">
            ← Back to Posts
          </Link>
        </div>
        <article className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-4">
            By {post.author.name} on{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
          <div className="mt-8 flex justify-end">
            <DeleteButton postId={post.id} />
          </div>
        </article>
      </div>
    </div>
  )
}
