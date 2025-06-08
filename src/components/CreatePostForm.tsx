'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { createPost } from '@/lib/post-actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CreatePostFormProps {
  authorId: string;
}

export default function CreatePostForm({ authorId }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Post cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('authorId', authorId);

      const result = await createPost(formData);
      
      if (result.error) {
        toast.error('Failed to create post', {
          description: result.error
        });
      } else {
        toast.success('Post created successfully');
        setContent('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="min-h-[100px] resize-none"
        required
        disabled={loading}
      />
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setContent('')}
          disabled={loading || !content.trim()}
        >
          Clear
        </Button>
        <Button
          type="submit"
          disabled={loading || !content.trim()}
          className="min-w-[100px]"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
} 