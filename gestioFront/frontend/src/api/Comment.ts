import { apiUrl } from "../contants";

export const addComment = async(data: any): Promise<any> => { 
    try {
        const res = await fetch(`${apiUrl}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/ld+json' },
            credentials: 'include',
            body: JSON.stringify(data)
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to add comment');
            }
            const comment = await res.json();
            return comment;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error adding comment:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error for further handling
    }
}

export const deleteComment = async (id: number): Promise<{status: number, success: boolean}> => {
    try {
        const res = await fetch(`${apiUrl}/api/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/ld+json' },
            credentials: 'include',
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to delete comment');
        }
        return { status: 204 , success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting comment:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error for further handling
    }
}