'use client';

import { useState } from 'react';
import { deletePost } from '@/lib/server-actions/post-actions';

interface DeleteButtonProps {
  id: string;
  itemName: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, itemName, onSuccess }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${itemName}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await deletePost(id);

    if (result.error) {
      setError(result.error);
    } else {
      if (onSuccess) {
        onSuccess();
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Deleting...' : `Delete ${itemName}`}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
} 