'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    userId: string;
}

const CommentSection = ({ articleId }: { articleId: string }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const fetchComments = async () => {
        const response = await fetch(`/api/comments?articleId=${articleId}`);
        if (response.ok) {
            const data = await response.json();
            setComments(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ articleId, content: newComment }),
        });

        if (response.ok) {
            setNewComment('');
            fetchComments();
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows={3}
                    placeholder="Write a comment..."
                    required
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Post Comment
                </button>
            </form>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-100 p-4 rounded">
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {new Date(comment.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
